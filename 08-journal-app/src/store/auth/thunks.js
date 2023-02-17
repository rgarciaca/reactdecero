import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./";


export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {

        await dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {

    return async ( dispatch ) => {
         await dispatch( checkingCredentials() );

         const result = await signInWithGoogle();
         if ( !result.ok ) dispatch( logout( result.errorMessage ) );

         await dispatch( login( result ) )
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async ( dispatch ) => {
        await dispatch( checkingCredentials() );

        const resp = await registerUserWithEmailPassword({ email, password, displayName });

        if ( !resp.ok ) return await dispatch( logout( resp ));

         await dispatch( login( resp ) );

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {
        await dispatch( checkingCredentials() );

        const resp = await loginWithEmailPassword({ email, password });

        if ( !resp.ok ) return await dispatch( logout( resp ));

         await dispatch( login( resp ) );

    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFirebase();

        dispatch( logout( {} ) );
    }
}