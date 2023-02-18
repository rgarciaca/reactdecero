import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import moment from 'moment/min/moment-with-locales';
import { setActiveNote, startSaveNote, startUploadingFiles, startDeletingNote } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );
  const { id, date, title, body, formState, onInputChange } = useForm( note )
  

  const dateString = useMemo( () => {
    moment.locale('es');
    const formatDate = moment(date).format('LLLL' )

    return formatDate;
  }, [date]);

  const fileInputRef = useRef();


  useEffect(() => {
    dispatch( setActiveNote( formState ))
  
  }, [formState])

  useEffect(() => {
    if( messageSaved.length > 0 ) {
      Swal.fire( 'Nota actualizada', messageSaved, 'success' );
    }
  
  }, [messageSaved])
  
  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  const onFileInputChange = ({ target }) => {
    if ( target.files === 0) return;

    dispatch( startUploadingFiles( target.files ));
  }

  const onDelete = () => {
    dispatch( startDeletingNote() );
  }

  return (
    <Grid className="animate__animated animate__fadeIn animate__faster" container direction="row" justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>
            <input type="file" ref={ fileInputRef } multiple onChange={ onFileInputChange } style={{ display: 'none' }}/>
            <IconButton color="primary" disabled={ isSaving } onClick={ () => fileInputRef.current.click() }><UploadOutlined></UploadOutlined></IconButton>
            <Button disabled={ isSaving } onClick={ onSaveNote } color="primary" sx={{ padding: 2 }}><SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>Guardar</Button>
        </Grid>
        <Grid container>
            <TextField type="text" variant="filled" fullWidth placeholder="Introduzca un título" label="Título" sx={{ border: 'none', mb: 1 }} name="title" value={ title } onChange={ onInputChange } ></TextField>

            <TextField type="text" variant="filled" fullWidth multiline placeholder="¿Que sucedio en el dia de hoy?" label="" minRows={ 5 } name="body" value={ body } onChange={ onInputChange } ></TextField>

        </Grid>

        <Grid container justifyContent='end'>
          <Button onClick={ onDelete } sx={{ mt: 2 }} color="error">
            <DeleteOutline></DeleteOutline>
            Borrar
          </Button>
        </Grid>

        <ImageGallery images= { note.imageUrls }></ImageGallery>
    </Grid>
  )
}
