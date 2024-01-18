import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos: null,
    getTodos: () => { },
    addTodo: () => { },
    removeTodo: () => { },
    completeTodo: () => { },
    updateTodo: () => { },
});

export const TodoProvider = TodoContext.Provider;

export const Todos = () => {
    return useContext(TodoContext);
}