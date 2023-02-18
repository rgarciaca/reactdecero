import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/JournalSlice";

export const SideBarItem = ( { note } ) => {

  const dispatch = useDispatch();

  const onClickNote = () => {
    dispatch( setActiveNote( note ));
  }


  return (
    <ListItem disablePadding >
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ note.title } />
                <ListItemText secondary={ note.body }></ListItemText>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
