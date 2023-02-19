import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "../../../store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../store/auth/thunks";
import { clearNotesLogout } from "../../../store/journal/JournalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../firebase/providers");

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('debe invocar el checkingCredentials', async () => {
        // const valor = checkingCredentials();

        
        await checkingAuthentication()( dispatch );

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe llamr checkingCredentials y login - Exito', async() => {
        const loginData = { ok:true, ...demoUser};
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe llamr checkingCredentials y logout - Error', async() => {
        const loginData = { ok:false, errorMessage: 'Un error en Google'};
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startLoginWithEmailPassword debe llamr checkingCredentials y login - Exito', async() => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' }
        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    
    test('startLoginWithEmailPassword debe llamr checkingCredentials y logout - Error', async() => {
        const loginData = { ok: false, errorMessage: 'Error en login email y password' };
        const formData = { email: demoUser.email, password: '123456' }
        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(  loginData  ) );
    });

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {
        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout());
        expect( dispatch ).toHaveBeenCalledWith( logout( {} ));

    })
})