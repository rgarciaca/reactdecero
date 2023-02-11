import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

export const FormWithCustomHook = () => {
    
    const { formState, onInputChange, onResetForm, username, email, password } = useForm({
        username: '',
        email: '',
        password: ''
    });

    // const { username, email, password } = formState;

   

  return (
    <>
        <h1>Formulario con custom hook</h1>
        <hr/>

        <input type="text" className="form-control" placeholder="User name" name="username" value={ username } onChange={ onInputChange }></input>
        <input type="email" className="form-control mt-2" placeholder="Email" name="email" value={ email } onChange={ onInputChange }></input>
        <input type="password" className="form-control mt-2" placeholder="Contraseña" name="password" value={ password } onChange={ onInputChange }></input>

        <button className="btn btn-primary mt-4" onClick={ onResetForm }>Limpiar campos</button>
    </>
  )
}
