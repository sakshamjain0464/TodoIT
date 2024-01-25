import { useEffect, useState } from "react";
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
  const [searchTag, setSearchTag] = useState("all");
  const tags = ["Important", "Due", "Completed"];
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

  const addTodo = async () => {
    const newTodo = {
      title: "New Todo",
      description: "New Todo Description",
      user: user.id,
      completed: false,
      tags: ["Due"],
    };

    const addedTodo = await database.addTodoToDataBase(newTodo);

    if (addTodo) {
      ShowMessage("New Todo Added", "success");
      setTodos((prev) => [...prev, addedTodo]);
    } else {
      ShowMessage("Failed to create new todo", "error");
    }
  };
  const updateTodo = async (todoId, values) => {
    const updateData = await database.updateTodoToDatabase(todoId, values);
    if (updateData) {
      getTodos();
      return true;
    } else {
      return false;
    }
  };
  const removeTodo = async (todoId) => {
    const removeData = await database.deleteTodoFromDatabase(todoId);
    if (removeData) {
      console.log(todos);
      setTodos(todos.filter((todo) => todoId != todo.$id));
      ShowMessage("Todo Deleted SuccessFully", "success");
    } else {
      ShowMessage("Cannot Delete Todo", "error");
    }
  };
  const completeTodo = async (todoId, value) => {
    const updateData = await database.updateTodoToDatabase(todoId, value);
    console.log(value);
    if (updateData) {
      return true;
    } else {
      return false;
    }
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
  }, [user]);

  return (
    <div className="sm:h-full h-fit w-[95%] min-h-screen sm:min-h-full">
      {user && (
        <div className="h-full w-full flex items-center justify-center pt-5">
          {loading ? (
            <Loader />
          ) : (
            <div className="h-full w-full flex flex-col items-center">
              <h1 className="mt-2 text-xl sm:text-3xl">Your Todos</h1>
              <select
                name=""
                id=""
                className="mt-3 sm:w-64 w-[80%] py-1 px-2 rounded-md focus:outline-none border-[0.5px] border-slate-950"
                value={searchTag}
                onInput={(e) => setSearchTag(e.target.value)}>
                <option value="all">All</option>
                {tags &&
                  tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
              </select>
              <div className="w-full h-[80%] sm:overflow-y-auto overflow-y-visible mt-3 sm:mt-8">
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
                  <TodoContainer tag={searchTag} />
                </TodoProvider>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
