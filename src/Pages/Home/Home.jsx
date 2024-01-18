import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import Loader from "../../Components/Loader/Loader";
import database from "../../Appwrite/database";
import TodoContainer from "../../Components/TodoContainer/TodoContainer";
import { TodoProvider } from "../../Context/TodoContext/TodoContext";
import ShowMessage from "../../Components/Message/Message";

export default function Home() {
  const { autoLogin, user, logout } = Authentication();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState(null);
  const navigate = useNavigate();

  const getTodos = async () => {
    const todos = await database.fetchTodos(user.id);
    setTodos(todos);
    console.log(todos);
    if (todos == null) {
      ShowMessage("Failed To Fetch Todos", "error");
      await logout();
      navigate("/login");
      return false;
    } else {
      return true;
    }
  };

  const addTodo = () => {
    console.log("added");
  };
  const updateTodo = () => {
    console.log("added");
  };
  const removeTodo = () => {
    console.log("added");
  };
  const completeTodo = () => {
    console.log("added");
  };

  useEffect(() => {
    if (user == null) {
      (async function () {
        setLoading(true);
        const loggedin = await autoLogin();
        setLoading(false);
        if (!loggedin) {
          navigate("/login");
        }
      })();
    }
  });

  return (
    <div className="h-full w-[95%]">
      {user && (
        <div className="h-full w-full flex items-center justify-center pt-5">
          {loading ? (
            <Loader />
          ) : (
            <div className="h-full w-full flex flex-col items-center">
              <h1 className="mt-2 text-3xl">Your Todos</h1>
              <select
                name=""
                id=""
                className="mt-3 w-64 py-1 px-2 rounded-md focus:outline-none border-[0.5px] border-slate-950">
                <option value="Hello">Hello</option>
                <option value="Hello">Bello</option>
                <option value="Hello">Trello</option>
              </select>
              <div className="w-full h-fit overflow-y-scroll mt-3 sm:mt-8">
                <TodoProvider
                  value={{
                    todos,
                    addTodo,
                    removeTodo,
                    completeTodo,
                    updateTodo,
                    getTodos,
                    setTodos,
                  }}>
                  <TodoContainer />
                </TodoProvider>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
