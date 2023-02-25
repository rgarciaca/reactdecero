import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store";

describe('Pruebas en uiSlice', () => {
    test('debe regresar el estado por defecto', () => {
        expect( uiSlice.getInitialState().isDateModalOpen ).toBeFalsy();
    });

    test('debe cambiar l isDateModalOpen correctamente', () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal() );
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer( state, onCloseDateModal() );
        expect(state.isDateModalOpen).toBeFalsy();
    });
})