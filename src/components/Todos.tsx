import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addTodo, deleteTodo, toggleTodo} from "../store/todoSlice.ts";
import Todo from "./Todo.tsx";
import { v4 as uuidv4 } from 'uuid';

const Todos = () => {
    const [text, setText] = useState('');
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();


    const handleInputChange = (event) => {
        setText(event.target.value);
    }

    const handleAddTodo = () => {
        if (text) {
            dispatch(addTodo({text: text, uuid: uuidv4()}));
            setText('');
        }
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className="container">

            <input type="text" value={text} onChange={handleInputChange}/> {" "}
            <button className="btn btn-primary" onClick={handleAddTodo}>Add Todo</button>

            {" "}


            {" "}
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    handleToggleComplete={() => handleToggleComplete(todo.id)}
                    handleDelete={() => handleDelete(todo.id)}/>
            ))
            }{" "}
        </div>
    )
}

export default Todos;