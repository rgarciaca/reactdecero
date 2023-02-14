import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en SearchPage', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Strider',
            }
        }

        beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrarse correctamente con valores por defecto', () => {
        
        const { container } = render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <SearchPage/>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        expect(container ).toMatchSnapshot();

    }) 

       test('debe de mostrar a batman y el input con el valor del querystring', () => {

        
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Strider',
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <SearchPage/>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        const inputValue = screen.getByRole('textbox').value;
        expect( inputValue ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

    });

    test('debe de mostrar un error si no se encuentra el hero', () => {


        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman123']}>
                    <SearchPage/>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        expect( screen.getByText('No hero with') ).toBeTruthy();
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        
        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search']}>
                    <SearchPage/>
                </MemoryRouter>
            </AuthContext.Provider>           
        );

        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: 'superman' }});

        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=superman');

    });
    
    
});