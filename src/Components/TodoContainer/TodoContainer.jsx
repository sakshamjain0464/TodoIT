import { useEffect, useState } from "react";
import { Todos } from "../../Context/TodoContext/TodoContext";
import Loader from "../Loader/Loader";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import TodoCard from "../TodoCard/TodoCard";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip/Tooltip";

export default function TodoContainer({ tag }) {
  const { todos, getTodos, setTodos, addTodo } = Todos();
  const [loading, setLoading] = useState(false);
  const [addLoader, setAddLoader] = useState(false);
  const { user } = Authentication();
  const [showAddTooltip, setShowAddTooltip] = useState(false);

  const handleAddTodo = async () => {
    setAddLoader(true);
    await addTodo();
    setAddLoader(false);
  };

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
  }, [todos, setTodos, getTodos, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        todos != null && (
          <div className="flex flex-wrap w-full h-fit gap-y-4 transition-all duration-200 ease-in py-5 sm:px-0 px-2">
            {tag == "all"
              ? todos.map((todo) => <TodoCard todo={todo} key={todo.$id} />)
              : todos.map(
                  (todo) =>
                    todo.tags.includes(tag) && (
                      <TodoCard todo={todo} key={todo.$id} />
                    )
                )}
            <div className="h-36 max-h-36 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 w-full">
              {addLoader ? (
                <Loader />
              ) : (
                <div className="h-full p-4 shadow-md rounded-md overflow-hidden hover:shadow-lg cursor-pointer active:shadow-none flex items-center justify-center">
                  <div
                    className="relative w-full h-full flex flex-col items-center justify-center"
                    onClick={handleAddTodo}
                    onMouseEnter={() => setShowAddTooltip(true)}
                    onMouseLeave={() => setShowAddTooltip(false)}>
                    <i className="fa-plus text-3xl"></i>
                    <Tooltip tooltipFunc={showAddTooltip} message={"Add New Todo"} className={"top-2"}/>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

TodoContainer.propTypes = {
  tag: PropTypes.string.isRequired,
};
