import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PrivateRoute } from "../../src/router";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en PrivateRoute.js', () => {
    test('si esta autenticado mostrara el children', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Strider',
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        expect(screen.getByText('Ruta privada')).toBeTruthy();

        expect ( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/');
    })
 
})