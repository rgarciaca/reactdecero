import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal/thunks"
import { savingNewNote } from "../../store/journal/JournalSlice"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( savingNewNote() ); 
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {
        ( !!active ) 
          ? <NoteView></NoteView>
          : <NothingSelectedView/>
      }

      <IconButton disabled={ isSaving } onClick={ onClickNewNote } size='large' sx={{ color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.8 }, position: 'fixed', right: 50, bottom: 50}}>
        <AddOutlined sx={{ fontSize: 30}}></AddOutlined>
      </IconButton>
    </JournalLayout>
  )
}
