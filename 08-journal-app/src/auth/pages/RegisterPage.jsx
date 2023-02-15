import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Create nueva cuenta">
      <form>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Nombre completo" type="text" placeholder="Nombre y apellidos" fullWidth></TextField>
          </Grid>          
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Correo" type="email" placeholder="Correo electrónico" fullWidth></TextField>
          </Grid>
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth></TextField>
          </Grid>  
          <Grid item xs={ 12 } sx={{ mt:2}}>
            <TextField label="Repetir contraseña" type="password" placeholder="Repetir contraseña" fullWidth></TextField>
          </Grid>           

          <Grid container spacing={ 2 } sx={{ mb: 2, mt:1 }} >
            <Grid item xs={ 12 }>
              <Button variant='contained' fullWidth>Crear cuenta</Button>
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
