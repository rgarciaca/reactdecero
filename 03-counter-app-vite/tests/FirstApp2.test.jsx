import { render, screen } from "@testing-library/react";
import { FirstApp } from "../src/FirstApp";

describe('Pruebas en <FirstApp />', () => {

    const subtitle = 'Soy un subtitulo!!!';
    const title = 'Hola, soy Goku';

    test("debe de hacer match con snapshot", () => {

        const { container}= render( <FirstApp title={ title }/>);
        expect( container ).toMatchSnapshot();
    });

    test('debe de mostrar el mensaje "Hola, soy Goku"', () => {

        render( <FirstApp title={ title }/>);
        expect( screen.getByText(title)).toBeTruthy();
    });

    test('debe de mostrar el titulo en un h1', () => {

        render( <FirstApp title={ title }/>);
        expect( screen.getByRole('heading', { level: 1 }).innerHTML).toContain(title);
    });

    test('debe de mostrar el subtitulo por props', () => {

        render( <FirstApp title={ title } subtitle= {subtitle}/>);
        expect( screen.getByText(subtitle)).toBeTruthy();
    });
});