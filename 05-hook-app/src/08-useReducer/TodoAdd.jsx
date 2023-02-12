import { useState } from "react";
import { useForm } from '../hooks';

export const TodoAdd = ( { onNewTodo }) => {

    const { description, onInputChange, onResetForm } = useForm({
        description: '',
    })

    const onSubmit = ( event ) => {
        event.preventDefault();

        if( description.trim().length <= 1 ) return;

        const newTodo = {
            id: new Date().getTime(),
            description,
            done: false,
        }

        onNewTodo && onNewTodo( newTodo );
        onResetForm();
    }   
  return (
    <form onSubmit={ onSubmit } aria-label="form">
        <input name="description" type="text" placeholder="¿Que hay que hacer?" className="form-control" value={ description } onChange={ onInputChange }></input>
        <button className="btn btn-outline-primary mt-4" type="submit">Agregar</button>
    </form>
  )
}
