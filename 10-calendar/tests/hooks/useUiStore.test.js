import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks"
import { store, uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

const getMockStore = ( initialState ) => {
    
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preLoadedState: {
            ui: { ...initialState }
        }
    });
}

describe('Pruebas en el useUiStore', () => {

    test('debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook( () => useUiStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        expect(result.current).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
        })
    });

    test('openDateModal debe colocar true en el isDatemodalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook( () => useUiStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        const { openDateModal } = result.current;

        act( () => {
            openDateModal();
        });
        expect( result.current.isDateModalOpen ).toBeTruthy();

    });

  test('closeDateModal debe colocar false en el isDatemodalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook( () => useUiStore(), {
            
            wrapper: ({ children }) => <Provider store= { mockStore }>{ children }</Provider>
        } );

        act( () => {
            result.current.closeDateModal();
        });
        expect( result.current.isDateModalOpen ).toBeFalsy();

    });   
})