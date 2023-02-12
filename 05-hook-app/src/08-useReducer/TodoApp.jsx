import { TodoList, TodoAdd } from './';
import { useTodo } from "../hooks";

export const TodoApp = () => {

    const { todos , handleNewTodo, handleDeleteTodo, handleToggleTodo,} = useTodo();
 
  return (
    <>
        <h1>TodoApp 10, <small>pendientes: 2</small></h1>
        <hr></hr>

        <div className="row">
            <div className="col-7">
                <TodoList todos={ todos } onDeleteTodo={ handleDeleteTodo } onToggleTodo={ handleToggleTodo }></TodoList>
            </div> 
            <div className="col-5">
                <h4>Agregar TODO</h4>
                <hr />

                <TodoAdd onNewTodo={ handleNewTodo }></TodoAdd>
            </div>
        </div>
    </>
  )
}
