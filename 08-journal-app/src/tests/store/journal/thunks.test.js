import { startNewNote } from "../../../store/journal/thunks";

jest.mock("../../../firebase/providers");

describe('Pruebas en JournalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe crear una nueva  nota', async () => {
       
        // const uid  = 'TEST-UID';
        // getState.mockReturnValue({ auth: { uid }})
        // await startNewNote()( dispatch, getState );


    });

})