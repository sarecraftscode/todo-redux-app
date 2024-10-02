import reducer, {addTodo, deleteTodo, toggleTodo} from '../src/store/todoSlice';
import {describe, expect, test, beforeEach} from "vitest";
import {Todo} from "../src/models/Todo";

describe('Todos Slice', () => {

    let slice: Slice;

    beforeEach(() => {
        slice = createSlice();
    });

    test('Should have empty todos initial state', () => {
        slice.givenIntialiStateIs(undefined);

        slice.whenUnknownActionIsPerform();

        slice.thenTodosShouldEqual([]);
    });


    test('Should add new todo to todos', () => {
        slice.givenIntialiStateIs([]);

        slice.whenAddTodoIsDispatchedWithTodo("New Todo", "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");

        slice.thenTodosShouldEqual([{
            "completed": false,
            "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "text": "New Todo"
        }]);
    });

    test('should toggle todo', () => {
        slice.givenIntialiStateIs([{
            "completed": false,
            "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "text": "New Todo"
        }]);

        slice.whenUserToggleTodo("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");

        slice.thenTodosShouldEqual([{
            "completed": true,
            "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "text": "New Todo"
        }]);
    });

    test('should delete todo', () => {
        slice.givenIntialiStateIs([{
            "completed": false,
            "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "text": "New Todo"
        },
        {
            "completed": true,
            "id": "8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "text": "Completed Todo"
        }]);

        slice.whenUserDeleteTodo("8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");

        slice.thenTodosShouldEqual([{
            "completed": false,
            "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "text": "New Todo"
        }]);
    }); 

});


const createSlice = () => {

    return {
        givenIntialiStateIs(param: Todo[]) {
            this.initialState = param;
        },

        whenUnknownActionIsPerform() {
            this.todos = reducer(this.initialState, {type: ''});
        },

        whenUserToggleTodo(todoId: string) {
            this.todos = reducer(this.initialState, toggleTodo(todoId));
        },


        whenAddTodoIsDispatchedWithTodo(newTodo: string, uuid: string) {
            this.todos = reducer(this.initialState, addTodo({text: newTodo, uuid: uuid}));
        },

        whenUserDeleteTodo(todoId: string) {
            this.todos = reducer(this.initialState, deleteTodo(todoId));
        },

        thenTodosShouldEqual(expectedTodo: Todo[]) {
            expect(this.todos).toEqual(expectedTodo);
        }
    }
}

type Slice = ReturnType<typeof createSlice>;