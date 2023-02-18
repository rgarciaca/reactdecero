import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const Sidebar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );

  return (
    <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant='permanent' open sx={{ displsy: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
            <Toolbar>
                <Typography variant='h6' nowrap="true" component='div' sx={{ fontSize: '1.0rem' }} >{ displayName }</Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map( note => (
                        <SideBarItem note={ note } key={ note.id} />
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
