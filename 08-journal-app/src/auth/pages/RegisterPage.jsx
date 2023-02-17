import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";


const formData = {
    displayName: '',
    email: '',
    password: '',
    repeatPassword: '',
}

const formValidations = {
  displayName: [(value) => value.length > 0, 'El nombre es obligatorio'],
  email: [ (value) => value.includes('@'), 'El correo debe tener un formato correcto'],
  password: [(value) => value.length >= 6, 'El password debe tener una longitud mayor a 6 caracteres'],
  repeatPassword: [(value) => value.length >= 6, 'El password debe tener una longitud mayor a 6 caracteres'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [ formSubmitted, setFormSubmitted ] = useState(false); 

  const {status, errorMessage} = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking',[status]);

  const { formState, displayName, email, password, repeatPassword, onInputChange,  
          isFormValid, displayNameInvalid, emailInvalid, passwordInvalid, repeatPasswordInvalid } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();

    console.log(isFormValid);
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword( formState ));
  }

  const matchPasswords = ( formState.password === formState.repeatPassword );

  return (
    <AuthLayout title="Create nueva cuenta">
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Nombre completo" type="text" placeholder="Nombre y apellidos" fullWidth name="displayName" onChange={ onInputChange } 
              error={ displayNameInvalid && formSubmitted } helperText={ formSubmitted && displayNameInvalid } value={ displayName } ></TextField>
          </Grid>          
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Correo" type="email" placeholder="Correo electrónico" fullWidth name="email" onChange={ onInputChange } 
              error={ emailInvalid && formSubmitted} helperText={ formSubmitted && emailInvalid } value={ email } ></TextField>
          </Grid>
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth name="password" onChange={ onInputChange } 
              error={ passwordInvalid && formSubmitted } helperText={ formSubmitted && passwordInvalid } value={ password } ></TextField>
          </Grid>  
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Repetir contraseña" type="password" placeholder="Repetir contraseña" fullWidth name="repeatPassword" 
              error={ repeatPasswordInvalid && formSubmitted } helperText={ formSubmitted && repeatPasswordInvalid } onChange={ onInputChange } value={ repeatPassword } ></TextField>
          </Grid>    
          <Grid item xs={ 12 } sx={{ mt:2}}>
            {
              matchPasswords ? null : <span style={{ color: 'red'}} >{ "Las contraseñas deben coincidir" }</span>
            }  
          </Grid>         

          <Grid container spacing={ 2 } sx={{ mb: 2, mt:1 }} >
            <Grid item xs={ 12 } display={!!errorMessage ? '' : 'none' }>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>            
            <Grid item xs={ 12 }>
              <Button variant='contained' type="submit" fullWidth disabled={ isCheckingAuthentication }>Crear cuenta</Button>
            </Grid>
            
          </Grid>

          <Grid container direction='row' justifyContent='end' >
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color='inherit' to="/auth/login">Iniciar sesión</Link>
          </Grid>          

        </Grid>
      </form>
    </AuthLayout>
  )
}
