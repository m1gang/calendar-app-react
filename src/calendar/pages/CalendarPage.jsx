import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { useState } from 'react'

import { NavBar } from "../components/NavBar"
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesEs } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'



const events = [{
    title: 'Cumpleaños',
    notes: 'Hay que comprar una torta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#eb4b4c',
    user: {
        _id: '123',
        name: 'Miguel'
    }
}]

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');  // Vista por defecto

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected })
        const style = {
            backgroundColor: '#158fd3',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        console.log({ onDoubleClick: event })
    }
    const onSelect = (event) => {
        console.log({ click: event })
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event)
    }

    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                view={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}

                onView={onViewChanged}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
            />
            <CalendarModal />
        </>
    )
}
