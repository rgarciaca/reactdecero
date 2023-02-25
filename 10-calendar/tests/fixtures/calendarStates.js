import { addHours } from "date-fns";

export const events = [
    {
        id: '1',
        title: 'Realizando una prueba de evento',
        notes: 'Probando los eventos del calendario',
        start: new Date('2023-02-27 13:00:00'),
        end: new Date('2023-02-27 14:30:00'),
    },
    {
        id: '2',
        title: 'Realizando una prueba de evento 2',
        notes: 'Probando los eventos del calendario 2',
        start: new Date('2023-02-28 13:00:00'),
        end: new Date('2023-02-28 14:30:00'),
    }
]

export const initialState = {
        isLoadingEvents: true,
        events: [],
        activeEvent: null
}

export const calendarWithEventsState = {
        isLoadingEvents: false,
        events: [ ...events ],
        activeEvent: null
}

export const calendarWithActiveEventState = {
        isLoadingEvents: false,
        events: [ ...events ],
        activeEvent: { ...events[0] }
}