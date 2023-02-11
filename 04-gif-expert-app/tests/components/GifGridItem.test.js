
import { render, screen } from '@testing-library/react';
import { GifGridItem } from '../../src/components/GifGridItem';


describe('Pruebas en <GifGridItem />', () => {

    const title = 'Smeagol';
    const url = 'https://elmundo.es/';

    test("debe de hacer match con el snapshot", () => {       

        const { container} = render( <GifGridItem title={ title } url={ url }/>);
        expect( container ).toMatchSnapshot();
    });

    test("debe de mostrar la imagen con el url y el alt indicado", () => {       

        render( <GifGridItem title={ title } url={ url }/>);
        const { src, alt } = screen.getByRole('img');
        expect( src ).toBe( url );
        expect( alt ).toBe(title);
    });

    test("debe de mostrar el titulo en el componente", () => {       

        render( <GifGridItem title={ title } url={ url }/>);
        expect( screen.getByText( title ) ).toBeTruthy();
    });
});