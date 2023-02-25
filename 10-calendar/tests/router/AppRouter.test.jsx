import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock("../../src/hooks/useAuthStore");
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Pruebas en <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();
    beforeEach( () => { 
        jest.clearAllMocks() 
        jest.clearAllTimers()
    });

    test('debe mostrar la pantalla de carga y llamar checkAuthToken', async () => {
        
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( <AppRouter />);
        expect( screen.getByText('Cargando ...')).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();
    });    

    test('debe mostrar el login en caso de estar autenticado', async () => {
        
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } =render( <MemoryRouter><AppRouter /></MemoryRouter>);
        expect( screen.getByText('Inicio de sesión')).toBeTruthy();
        expect( container ).toMatchSnapshot();
    });      
    
    test('debe mostrar el calendario en caso de estar autenticado', async () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render( <MemoryRouter><AppRouter /></MemoryRouter>);
        screen.debug();
        expect( screen.getByText('CalendarPage')).toBeTruthy();
    });    
})