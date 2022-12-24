import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { database } from "../../firebaseConfig";

export const EditTodo = ({ todoId, successfulEdit }) => {
    const [err, setErr] = useState('');
    const { todos } = useContext(TodoContext);
    const currentTodo = todos.find(todo => todo.id === todoId);
    const [input, setInput] = useState(currentTodo.title);

    useEffect(() => {
        setInput(currentTodo.title)
    }, [currentTodo.title]);

    const onEditTodo = (e) => {
        e.preventDefault();

        if (input === '') {
            setErr('Please add valid todo!');
            return;
        }

        if (input.length > 25) {
            setErr('Todo must be less then 25 characters!');
            return;
        }

        updateDoc(doc(database, 'todos', todoId), {
            title: input
        })
            .then(() => {
                successfulEdit();
            })
            .catch((err) => {
                setErr(err.message);
            })
    }

    return (
        <section className="add__todo">
            <h1>ToDo App</h1>
            <form className="add__todo__form" onSubmit={onEditTodo}>
                <label htmlFor="todo"></label>
                <input type="text"
                    id="todo"
                    name="todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />
                <button className="add__todo__btn">Edit Task</button>
                <p className="errors">{err}</p>
            </form>
        </section>
    );
}