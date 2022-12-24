import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TodoContext } from '../../contexts/TodoContext';
import { Logout } from "../auth/Logout";
import { CreateTodo } from "./CreateTodo";
import { DeleteTasks } from "./DeleteTasks";
import { EditTodo } from "./EditTodo";
import { Todo } from "./Todo";

export const Todos = () => {
    const { todos } = useContext(TodoContext);
    const { loggedUser } = useContext(AuthContext);
    const [create, setCreate] = useState(true);
    const [id, setId] = useState('');
    const currentTodos = todos.filter(todo => todo.uid === loggedUser?.uid)

    const onEditHandler = (todoId) => {
        setCreate(false);
        setId(todoId);
    }

    const successfulEdit = () => {
        setCreate(true);
    }

    return (
        <div className="todos">
            <Logout />
            {create ? <CreateTodo /> : <EditTodo todoId={id} successfulEdit={successfulEdit} />}
            <section className="todos__container">
                <h1>ToDo List</h1>
                {currentTodos.length > 0
                    ? currentTodos.map(todo => <Todo key={todo.id} todo={todo} onEditHandler={onEditHandler} />)
                    : <p>No todos here!</p>}
            </section >
            <DeleteTasks />
        </div >
    );
}