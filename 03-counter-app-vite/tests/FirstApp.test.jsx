import { render } from "@testing-library/react";
import { FirstApp } from "../src/FirstApp";

describe('Pruebas en <FirstApp />', () => {

    // test("debe de hacer match con el snapshot", () => {
        
    //     const title = 'Hola, soy Goku';
    //     const { container } = render( <FirstApp title={ title }/>);

    //     expect( container ).toMatchSnapshot();


    // });

    test("debe mostrar el título en un h1", () => {
        const title = 'Hola, soy Goku';
        const { container, getByText, getByTestId }= render( <FirstApp title={ title }/>);

        expect(getByText(title)).toBeTruthy();

        // const h2 = container.querySelector('h2');
        // expect(h2.innerHTML).toContain(title);

        expect(getByTestId('test-title').innerHTML).toContain(title);


    });

    test("debe de mostrar el subtitulo enviado por props", () => {

        const subtitle = 'Soy un subtitulo!!!';
        const title = 'Hola, soy Goku';
        const { getByText }= render( <FirstApp title={ title } subtitle={ subtitle }/>);

        expect(getByText(title)).toBeTruthy();
    });
});