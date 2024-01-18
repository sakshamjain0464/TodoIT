import React, { useEffect, useState } from "react";
import { Todos } from "../../Context/TodoContext/TodoContext";
import ShowMessage from "../Message/Message";
import Loader from "../Loader/Loader";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import TodoCard from "../TodoCard/TodoCard";

export default function TodoContainer({ tag }) {
  const { todos, getTodos, setTodos, addTodo } = Todos();
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
  },[todos, setTodos, addTodo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        todos != null && (
          <div className="flex flex-wrap w-full h-fit gap-y-4 transition-all duration-200 ease-in py-5">
            {tag == "all"
              ? todos.map((todo) => <TodoCard todo={todo} key={todo.$id} />)
              : todos.map(
                  (todo) =>
                    todo.tags.includes(tag) && (
                      <TodoCard todo={todo} key={todo.$id} />
                    )
                )}
                <div className="h-36 max-h-36 sm:w-1/2 md:w-1/3 lg:w-1/4 w-full">
                  <div className="h-full p-4 shadow-md rounded-md overflow-hidden hover:shadow-lg cursor-pointer active:shadow-none">
                      <div className="w-full h-full flex items-center justify-center" onClick={addTodo}>
                        <i className="fa-plus text-3xl"></i>
                      </div>
                  </div>
                </div>
          </div>
        )
      )}
    </>
  );
}
