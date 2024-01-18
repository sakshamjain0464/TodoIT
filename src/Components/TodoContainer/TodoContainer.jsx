import React, { useEffect, useState } from "react";
import { Todos } from "../../Context/TodoContext/TodoContext";
import ShowMessage from "../Message/Message";
import Loader from "../Loader/Loader";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import TodoCard from "../TodoCard/TodoCard";

export default function TodoContainer() {
  const { todos, getTodos, setTodos } = Todos();
  const [loading, setLoading] = useState(false);
  const { user } = Authentication();

  useEffect(() => {
    if (user == null) {
      setTodos(null);
    }
    if (todos == null) {
      (async function () {
        setLoading(true);
        await getTodos();
        setLoading(false);
      })();
    }
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : todos != null && todos.length != 0 ? (
        <div>
          <div className="flex flex-wrap gap-4 p-5 transition-all duration-200 ease-in">
            {todos.map((todo) => (
              <TodoCard todo={todo} key={todo.$id} />
            ))}
          </div>
        </div>
      ) : (
        <div>No todos</div>
      )}
    </>
  );
}
