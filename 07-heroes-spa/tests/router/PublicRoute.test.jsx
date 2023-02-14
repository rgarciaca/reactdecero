import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PublicRoute } from "../../src/router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en PublicRoute.js', () => {
    test('si no esta autenticado mostrara el children', () => {

        const contextValue = {
            logged: false
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta Pública</h1>
                </PublicRoute>
            </AuthContext.Provider>           
        );

        expect(screen.getByText('Ruta Pública')).toBeTruthy();
    })

  test('debe navegar si esta auteticado', () => {

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
                    <Routes>
                        <Route path='login' element={ 
                            <PublicRoute>
                                <h1>Ruta Pública</h1>
                            </PublicRoute>
                         }></Route>
                        <Route path='/' element={ <h1>Página Marvel</h1> }></Route>
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>           
        );

        expect(screen.getByText('Página Marvel')).toBeTruthy();
    })    
})