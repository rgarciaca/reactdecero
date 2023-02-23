import { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks"
import Swal from "sweetalert2";


const loginFormFields = {
    loginEmail:     '',
    loginPassword:  '',

}

export const LoginForm = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange} = useForm( loginFormFields );

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });

    }

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }
    

    }, [errorMessage])
    

    return (
        <>
            <h3>Inicio de sesión<nav></nav></h3>
            <form onSubmit={ loginSubmit }> 
                <div className="form-group mb-2">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Correo"
                        name="loginEmail"
                        value={ loginEmail }
                        onChange={ onInputChange}
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="loginPassword"
                        value={ loginPassword }
                        onChange={ onInputChange}
                    />
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="submit"
                        className="btnSubmit"

                        value="Login" 
                    />
                </div>
            </form>    
        </>
    )
}
