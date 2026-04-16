import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        currentId: 4,
        todos: []
    },
    reducers: {

        addTodo: (state, action) => {
            state.currentId += 1;
            state.todos.push({
                id: state.currentId,
                text: action.payload.trim(),
                state: 'todo',
            })
        },
        updateTodo: (state, action) => {
           const index = state.todos.findIndex((todo) => todo.id === action.payload);
            if (index === -1) {
                return;
            }
            
            const [todo] = state.todos.splice(index, 1);
            todo.state = todo.state === 'todo' ? 'done' : 'todo';
            state.todos.push(todo)
        },
        deleteTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            if (index === -1) {
                return;
            }
            state.todos.splice(index, 1);
        }
    },
});

export default todoSlice.reducer;
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;