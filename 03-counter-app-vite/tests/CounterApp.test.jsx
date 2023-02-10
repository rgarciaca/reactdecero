import { fireEvent, render, screen } from "@testing-library/react";
import { CounterApp } from "../src/CounterApp";



describe('Pruebas en <CounterApp />', () => {

    const value = 10;

    test("debe de hacer match con el snapshot", () => {       

        const { container} = render( <CounterApp value={ value }/>);
        expect( container ).toMatchSnapshot();
    });

    test("debe mostrar el valñor inicial de 100", () => {

        render( <CounterApp value={ value }/>);
        expect( screen.getByText(value)).toBeTruthy();
    });

    test("debe incrementar con el boton +1", () => {

        render( <CounterApp value={ value }/>);
        fireEvent.click( screen.getByText('+1'));
        expect( screen.getByText(value + 1)).toBeTruthy();
    });    

    test("debe incrementar con el boton -1", () => {

        render( <CounterApp value={ value }/>);
        fireEvent.click( screen.getByText('-1'));
        expect( screen.getByText(value - 1)).toBeTruthy();
    }); 
    
    test("debe incrementar con el boton Reset", () => {

        render( <CounterApp value={ value }/>);
        fireEvent.click( screen.getByText('+1'));
        fireEvent.click( screen.getByText('+1'));
        fireEvent.click( screen.getByText('+1'));
        fireEvent.click( screen.getByText('Reset'));
        expect( screen.getByText(value)).toBeTruthy();
    });     
});

