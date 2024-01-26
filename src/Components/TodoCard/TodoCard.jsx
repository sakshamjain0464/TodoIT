import { useState } from "react";
import { Todos } from "../../Context/TodoContext/TodoContext";
import ShowMessage from "../Message/Message";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";

export default function TodoCard({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isComplete, setIsComplete] = useState(todo.completed);
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [loading, setLoading] = useState(false);
  const { updateTodo, completeTodo, removeTodo } = Todos();

  const editButtonHandler = () => {
    setIsEditing(true);
    setExpanded(true);
  };

  const handleTitleInput = (e) => {
    const newTitle = e.target.value;

    if (newTitle.length > 200) {
      ShowMessage("Title cannot be more than 200 characters", "warning");
    } else {
      setTitle(newTitle);
    }
  };

  const handleDescriptionInput = (e) => {
    const newDesc = e.target.value;

    if (newDesc.length > 800) {
      ShowMessage("Description cannot be more than 800 characters", "warning");
    } else {
      setDescription(newDesc);
    }
  };

  const todoChangesSave = async () => {
    setLoading(true);
    todo.title = title;
    todo.description = description;

    const updates = {
      title: todo.title,
      description: todo.description,
      tags: todo.tags,
    };

    const updated = await updateTodo(todo.$id, updates);
    if (updated) {
      ShowMessage("Todo Updated SuccessFully!", "success");
      setIsEditing(false);
      setExpanded(false);
    } else {
      ShowMessage("Cannot Update Todo!", "error");
    }
    setLoading(false);
  };

  const todoChangesCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setExpanded(false);
    setIsEditing(false);
  };

  const handleTagSelect = (e) => {
    todo.tags.push(e.target.value);
  };

  const completeTodoHandler = async () => {
    setLoading(true);
    let marked = false;
    if (isComplete) {
      const completedIndex = todo.tags.indexOf("Completed");
      todo.tags.splice(completedIndex, 1);
      todo.tags.push("Due");
      marked = await completeTodo(todo.$id, {
        completed: false,
        tags: todo.tags,
      });
    } else {
      const dueIndex = todo.tags.indexOf("Due");
      todo.tags.splice(dueIndex, 1);
      todo.tags.push("Completed");
      marked = await completeTodo(todo.$id, {
        completed: true,
        tags: todo.tags,
      });
    }
    if (marked) {
      todo.completed = !isComplete;
      !isComplete
        ? ShowMessage("Todo Marked Complete!", "success")
        : ShowMessage("Todo Marked Incomplete!", "success");
      setIsComplete((prev) => !prev);
    } else {
      ShowMessage("Cannot mark complete now!", "error");
    }
    setLoading(false);
  };

  const removeTodoHandler = async () => {
    setLoading(true);
    await removeTodo(todo.$id);
    setLoading(false);
  };

  return (
    <div
      className={`${
        expanded
          ? "max-h-96 h-96 w-full"
          : "max-h-36 sm:w-1/2 md:w-1/3 lg:w-1/4 w-full h-36"
      } transition-all duration-300 ease-in px-2 flex items-center justify-center`}>
      {!loading ? (
        <div
          className={`relative ${
            isComplete ? "bg-gray-300" : "bg-white"
          } h-full w-full p-4 shadow-md rounded-md overflow-hidden hover:shadow-xl transition-all ${
            expanded
              ? "duration-500"
              : `duration-300 hover:scale-105 ${
                  !isComplete
                    ? "hover:bg-gradient-to-r hover:from-white hover:to-gray-200"
                    : ""
                }`
          } ease-in`}>
          <input
            className={`text-xl mb-2 w-full text-ellipsis overflow-hidden bg-transparent ${
              isComplete
                ? "line-through"
                : "focus:outline-none active:outline-none"
            } cursor-text`}
            value={title}
            disabled={isComplete || !isEditing ? true : false}
            onChange={handleTitleInput}
          />
          <textarea
            className={`text-sm w-full text-ellipsis bg-transparent resize-none ${
              isComplete ? "line-through" : ""
            } 'focus:outline-none active:outline-none mb-5' ${
              expanded
                ? "h-[250px] overflow-y-auto"
                : "h-[22px] overflow-y-hidden"
            } transition-all duration-300 ease-in cursor-text`}
            value={description}
            disabled={isComplete || !isEditing ? true : false}
            rows={expanded ? 500 : 1}
            onChange={handleDescriptionInput}
          />
          <div
            className={`absolute top-1 right-2 sm:text-sm text-base cursor-pointer ${
              !isEditing && !isComplete ? "block" : "hidden"
            }`}
            onClick={editButtonHandler}>
            <i className="fa-solid fa-pen" />
          </div>
          <div className="h-fit flex">
            <p className="italic">~{todo.tags.join(", ")}</p>
            <select
              name=""
              id=""
              className={`${
                isEditing ? "block" : "hidden"
              } active:outline-none focus:outline-none`}
              onInput={handleTagSelect}>
              <option key={"no-tag"} value={"no-tag"}>
                {"no-tag"}
              </option>
              <option key={"important"} value={"important"}>
                {"important"}
              </option>
            </select>
          </div>
          <div
            className={`h-4 mt-3 flex items-center  ${
              isEditing ? "hidden" : "block"
            }`}>
            <div
              className={`h-4 w-4 mr-4 border-2 rounded sm ${
                isComplete
                  ? "bg-green-500 border-green-950"
                  : "bg-white border-slate-900"
              } cursor-pointer`}
              onClick={completeTodoHandler}></div>
            <i
              className="fa-solid fa-trash mr-4 cursor-pointer"
              onClick={removeTodoHandler}
            />
            <i
              className={`fa-solid ${
                expanded
                  ? "fa-down-left-and-up-right-to-center"
                  : "fa-up-right-and-down-left-from-center"
              } mr-4 cursor-pointer`}
              onClick={() => setExpanded((prev) => !prev)}
            />
          </div>
          <div
            className={`h-4 mt-3 w-full flex items-center ${
              !isEditing ? "hidden" : "flex"
            } justify-center `}>
            <button
              className="px-3 py-2 rounded-md bg-green-600 text-white mx-2 hover:bg-green-500 active:bg-green-500"
              onClick={todoChangesSave}>
              <i className="fa-check fa-solid mr-1"></i>Done
            </button>
            <button
              className="px-3 py-2 rounded-md bg-red-600 text-white mx-2 hover:bg-red-500 active:bg-red-500"
              onClick={todoChangesCancel}>
              <i className="fa-remove fa-solid mr-1"></i>Cancel
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

TodoCard.propTypes = {
  todo: PropTypes.object.isRequired,
};
