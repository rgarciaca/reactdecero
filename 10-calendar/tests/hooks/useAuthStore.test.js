import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import {  renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { act } from "react-dom/test-utils";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = ( initialState ) => {
    
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preLoadedState: {
            auth: { ...initialState }
        }
    });
}

describe('Pruebas en el useAuthStore', () => {

    test('debe regresar los valores por defecto', () => {

        const mockStore = getMockStore( initialState );
        const { result } = renderHook( () => useAuthStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        expect(result.current).toEqual({
            status: 'checking', 
            user: {}, 
            errorMessage: undefined,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),            
        })
    });

    test('startLogin debe realizar el login correctamente', async () => {

        localStorage.clear();

        const mockStore = getMockStore( notAuthenticatedState );
        const { result } = renderHook( () => useAuthStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        await act( async () => {
            await result.current.startLogin( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;
        expect(  { errorMessage, status, user } ).toEqual({
            status: 'authenticated',  
            user: {
            uid: "63f8ed554797548d3079ae8a",
            name: "test User",
            },
            errorMessage: undefined,
        });

        expect( localStorage.getItem('token')).toEqual( expect.any(String));
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String));

    });

    test('startLogin debe fallar la autenticación', async () => {

        localStorage.clear();

        const mockStore = getMockStore( notAuthenticatedState );
        const { result } = renderHook( () => useAuthStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        await act( async () => {
            await result.current.startLogin( { email: 'algo@algo.com', password: '983475t' } );
        });

        const { errorMessage, status, user } = result.current;
        expect(  { errorMessage, status, user } ).toEqual({
            status: 'not-authenticated',  
            user: {},
            errorMessage: 'Usuario o password incorrectos',
        });

        await waitFor(
            () => expect( result.current.errorMessage ).toBe(undefined)
        );

        expect( localStorage.getItem('token')).toBeNull( );
        expect( localStorage.getItem('token-init-date')).toBeNull( );

    });

    test('startRegister debe crear un usuario', async () => {

        localStorage.clear();

        const mockStore = getMockStore( notAuthenticatedState );
        const { result } = renderHook( () => useAuthStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: "123456789",
                name: "alguien",
                token: "algun-token"                
            }
        });

        await act( async () => {
            await result.current.startRegister( { name: 'alguien', email: 'algo1@algo.com', password: '123456789' } );
        });

        const { errorMessage, status, user } = result.current;

        expect(  { errorMessage, status, user } ).toEqual({
            status: 'authenticated',  
            user:  { name: 'alguien', uid: '123456789' },
            errorMessage: undefined,
        });

        spy.mockRestore();
    });    

    test('startRegister debe fallar la creacion', async () => {

        localStorage.clear();

        const mockStore = getMockStore( notAuthenticatedState );
        const { result } = renderHook( () => useAuthStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        await act( async () => {
            await result.current.startRegister( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;

        expect(  { errorMessage, status, user } ).toEqual({
            errorMessage: 'Ya existe un usuario con ese correo',
            status: 'not-authenticated',
            user: {}
        });

    });   

    test('checkAuthToken debe fallar si no hay token', async () => {

        localStorage.clear();

        const mockStore = getMockStore( initialState );
        const { result } = renderHook( () => useAuthStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        await act( async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect(  { errorMessage, status, user } ).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });

    });   

    test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {

        localStorage.clear();

        const { data } = await calendarApi.post( '/auth', testUserCredentials );
        localStorage.setItem( 'token', data.token );

        const mockStore = getMockStore( initialState );
        const { result } = renderHook( () => useAuthStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        await act( async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect(  { errorMessage, status, user } ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'test User', uid: '63f8ed554797548d3079ae8a'}
        });

    });   

//   test('closeDateModal debe colocar false en el isDatemodalOpen', () => {

//         const mockStore = getMockStore({ isDateModalOpen: true });
//         const { result } = renderHook( () => useUiStore(), {
            
//             wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
//         } );

//         act( () => {
//             result.current.closeDateModal();
//         });
//         expect( result.current.isDateModalOpen ).toBeFalsy();

//     });   
})