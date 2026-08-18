import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { sileo } from "sileo";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizando

        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        sileo.success({
          title: "Evento actualizado",
          description: "Evento actualizado correctamente",
        });
        return;
      } else {
        //Creando

        const { data } = await calendarApi.post("/events", calendarEvent);

        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      }
    } catch (error) {
      console.log(error.response.data.msg);

      sileo.error({
        title: "Error al guardar",
        description: error.response.data.msg,
      });
    }
  };

  const startDeletingEvent = () => {
    //todo: llegar al backend

    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
