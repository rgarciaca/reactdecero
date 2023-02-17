import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth";


export const Navbar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() );
    }

  return (
    <AppBar position='fixed' sx={{ width: { sm: `calc(100% - ${ drawerWidth }px)` }, ml: { drawerWidth } }}>
        <Toolbar>
            <IconButton color='inherit' edge='start' sx={{ mr: 2, display: { sm: 'none' } }} >
                <MenuOutlined sx={{ color: 'white' }}></MenuOutlined>
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' nowrap='true' component='div'>JournalApp</Typography>

                <IconButton color='error' onClick={ onLogout }>
                    <LogoutOutlined></LogoutOutlined>
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
