import { render, screen } from "@testing-library/react";
import { GifExpertApp } from "../src/GifExpertApp"

describe('Pruebas en <GifExpertApp />', () => {

    test('debe existir el componente ', () => {
        
        render( <GifExpertApp /> );
        expect( screen.getByText('GifExpertApp') );

    });

    test('debe existir el componente ', () => {
        
        render( <GifExpertApp /> );
        expect( screen.getByText('GifExpertApp') );

    });


});