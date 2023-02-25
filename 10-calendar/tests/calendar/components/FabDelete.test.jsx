import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks"


jest.mock('../../../src/hooks/useCalendarStore');


describe('Pruebas en <FabDelete />', () => {

    const mockStartDeletingEvent = jest.fn();
    beforeEach( () => { 
        jest.clearAllMocks() 
        jest.clearAllTimers()
    });

    test('debe mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        render(
            <FabDelete></FabDelete>
        );

        const btn = screen.getByLabelText('btn-delete');
        expect( btn.classList.toString() ).toContain('btn');
        expect( btn.classList.toString() ).toContain('btn-danger');
        expect( btn.classList.toString() ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');
    });

    test('debe mostrar el botón si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });

        render(
            <FabDelete></FabDelete>
        );

        const btn = screen.getByLabelText('btn-delete');
        expect( btn.style.display ).toBe('');
    });

    test('debe llamar startDeletingEvent si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render(
            <FabDelete></FabDelete>
        );

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalled();
    });
})