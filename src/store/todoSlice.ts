import {createSlice} from "@reduxjs/toolkit";
import {Todo} from "../models/Todo.ts";

const initialState = [] as Todo[];


const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            const {text, uuid} = action.payload;
            const newTodo = {
                id: uuid,
                text: text,
                completed: false
            }
            state.push(newTodo);
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer