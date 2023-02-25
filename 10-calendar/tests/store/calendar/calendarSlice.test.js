import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Pruebas en calendarSlice', () => {

    test('debe regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test('onSetActiveEvent debe activar el evento', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        expect( state.activeEvent).toEqual( events[0] );
     });

     test('onAddNewEvent debe agregar el event', () => {
        const newEvent = {
            id: 3,
            start: new Date('2023-03-02 12:30:00'),
            end: new Date('2023-03-02 14:00:00'),
            title: 'Añadiendo un nuevo evento',
            notes: 'Se va a añadir un nuevo evento al calendario'
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        expect( state.events ).toEqual([ ...events, newEvent ]);
     });

    test('onUpdateEvent debe agregar el event', async () => {
        const updatedEvent = {
            id: '1',
            title: 'Realizando una prueba de evento!!!',
            notes: 'Probando los eventos del calendario, actualizado',
            start: new Date('2023-02-27 13:00:00'),
            end: new Date('2023-02-27 14:30:00'),
        }

        const state = await calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
        expect( state.events ).toContain( updatedEvent );
     });

    test('onDeleteEvent debe borrar el evento activo', async () => {
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );

        const delState = await calendarSlice.reducer( state, onDeleteEvent() );
        expect( delState.activeEvent ).toBeNull( );
        expect( delState.events ).not.toContain( state.activeEvent );
     });    
     
    test('onLoadEvents debe cargar los eventos', async () => {

        const state = await calendarSlice.reducer( initialState, onLoadEvents(events) );
        expect (state.isLoadingEvents).toBeFalsy();
        expect( state.events.length ).toBeGreaterThan( 0 );
        expect( state.events ).toEqual( events );
     });     

    test('onLogoutCalendar debe limpiar el estado', async () => {
  
        const state = await calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
     });     
})