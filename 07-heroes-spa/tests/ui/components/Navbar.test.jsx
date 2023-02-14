import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en Navbar.jsx', () => {
    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Strider',
        },
        logout: jest.fn(),         
    }

    beforeEach( () => jest.clearAllMocks() );

    test('debe mostrar el nombre del usuario logado', () => {

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Navbar>
                    </Navbar>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        expect(screen.getByText('Strider')).toBeTruthy();
    })

    test('debe de llamar el logout y navigate cuando de hace click en el boton', () =>{



        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Navbar>
                    </Navbar>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { 'replace': true });

    })
 
})