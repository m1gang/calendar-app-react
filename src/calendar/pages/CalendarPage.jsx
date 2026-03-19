import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";
import { useState } from "react";

import { NavBar } from "../components/NavBar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week",
  ); // Vista por defecto

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected })
    const style = {
      backgroundColor: "#158fd3",
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event })
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        view={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onView={onViewChanged}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
      />
      <FabAddNew />
      <FabDelete />
      <CalendarModal />
    </>
  );
};
