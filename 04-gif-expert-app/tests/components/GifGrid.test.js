import { render } from "@testing-library/react";
import { GifGrid } from "../../src/components";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas en <GifGrid />', () => {

    const category = 'LOTR';

    test("debe de mostrar el loading inicialmente", () => {       

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true,
        });


        render( <GifGrid category={ category } />);
        expect( screen.getByText('Cargando...'));
        expect( screen.getByText( category ));
    });

    test("debe de mostrar items cuandose cargan las imagenes useFetchGifs", () => {       

        const gifs = [
            {
                id: 'ABC',
                title: 'Smeagol',
                url: 'https://localhost/smeagol.jpg'
            },
            {
                id: '123',
                title: 'Aragorn',
                url: 'https://localhost/Aragorn.jpg'
            }            
        ]

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: false,
        });

        render( <GifGrid category={ category } />);
        expect( screen.getByRole('img').length).toBe(2);

    });
});