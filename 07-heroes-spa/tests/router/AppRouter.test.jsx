import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth/context/AuthContext";
import { AppRouter } from "../../src/router";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en AppRouter.js', () => {
    test('si no esta autenticado mostrara el login', () => {

        const contextValue = {
            logged: false,
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/']}>
                    <AppRouter>
                    </AppRouter>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        expect(screen.getAllByText('Login').length).toBe(2);

    }) 

    test('si  esta autenticado mostrar el componente de Marvel', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Strider',
            }            
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter>
                    </AppRouter>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        expect(screen.getByText('Marvel Comics')).toBeTruthy();

    })     
})
