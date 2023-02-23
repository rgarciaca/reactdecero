import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import { useEffect } from "react";


const registerFormFields = {
    registerName:       '',       
    registerEmail:      '',
    registerPassword:   '',
    registerPassword2:  '',
}


export const RegisterForm = () => {

    const { startRegister, errorMessage } = useAuthStore();
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange } = useForm( registerFormFields );

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en registro de usuario', 'Las contraseñas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Error en el registro de usuario', errorMessage, 'error');
      }
    

    }, [errorMessage])

    return (
        <>
            <h3>Registro</h3>
            <form onSubmit={ registerSubmit }>
                <div className="form-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="registerName"
                        value={ registerName }
                        onChange={ onInputChange}                               
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name="registerEmail"
                        value={ registerEmail }
                        onChange={ onInputChange}                        
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña" 
                        name="registerPassword"
                        value={ registerPassword }
                        onChange={ onInputChange}
                    />
                </div>

                <div className="form-group mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña" 
                        name="registerPassword2"
                        value={ registerPassword2 }
                        onChange={ onInputChange}                               
                    />
                </div>

                <div className="form-group mb-2">
                    <input 
                        type="submit" 
                        className="btnSubmit" 
                        value="Crear cuenta" />
                </div>
            </form>    
        </>
    )
}
