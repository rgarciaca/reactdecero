import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en el authSlice', () => {

    test('debe regresar el estado inicial', () => {
        expect(authSlice.getInitialState()).toEqual( initialState );
    });

    test('debe realizar un login', () => {
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined,
        } )
    });

    test('debe realizar un logout', () => {
        const state = authSlice.reducer( authenticatedState, onLogout( ) );
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        } )
    });

    test('debe realizar un logout con mensaje de error', () => {
        const state = authSlice.reducer( authenticatedState, onLogout('Credenciales no validas' ) );
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Credenciales no validas',
        } )
    });

    test('debe realizar una limpieza tras el logout', () => {
        const state = authSlice.reducer( authenticatedState, onLogout('Credenciales no validas' ) );
        const newState = authSlice.reducer( state, clearErrorMessage() );
        expect(newState).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        } )
    });
})