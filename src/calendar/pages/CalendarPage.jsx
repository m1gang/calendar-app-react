import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { useState } from 'react'

import { NavBar } from "../components/NavBar"
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesEs } from '../../helpers/getMessages'



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
    const [lastView, setLastView] = useState('month')  // Vista por defecto

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log({ event, start, end, isSelected })
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

    const onViewChanged = (event) => {
        setLastView(event)
    }

    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                onView={onViewChanged}
            />
        </>
    )
}
