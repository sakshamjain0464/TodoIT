import React, { useState } from "react";
import { tags } from "./tags";

export default function TodoCard({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [expanded, setExpanded] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)

  const editButtonHandler = () => {
    if(!isComplete){
      setIsEditing(true);
      setExpanded(true);
    }
  }

  const todoChangesSave = () => {
    todo.title = title;
    todo.description = description;
    setIsEditing(false);
    setExpanded(false)
  }

  const todoChangesCancel =() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setExpanded(false);
    setIsEditing(false)
  }

  const handleTagSelect = (e) => {
    todo.tags.push(e.target.value)
  }

  return (
    <div className={`${(expanded)?'max-h-96 h-96 w-full':'max-h-36 sm:w-1/2 md:w-1/3 lg:w-1/4 w-full h-30'} transition-all duration-200 ease-in px-2`}>
      <div
        className={`relative ${(isComplete)?'bg-gray-300':'bg-white'} h-full p-4 shadow-md rounded-md overflow-hidden hover:shadow-lg`}
        id={todo.$id}>
        <input
          className={`text-xl mb-2 w-full text-ellipsis overflow-hidden bg-transparent ${(isComplete)?'line-through':'focus:outline-none active:outline-none'}`}
          value={title}
          disabled={(isComplete || !isEditing)?true:false}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={`text-sm w-full text-ellipsis ${(expanded)?'overflow-y-auto':'overflow-y-hidden'} bg-transparent resize-none ${(isComplete)?'line-through':''} 'focus:outline-none active:outline-none mb-5' ${(expanded)?'h-[250px]':'h-[auto]'}`}
          value={description}
          disabled={(isComplete || !isEditing)?true:false} rows={(expanded)?500:1}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={`absolute top-1 right-2 text-sm cursor-pointer ${(!isEditing && !isComplete)?'block':'hidden'}`} onClick={editButtonHandler}>
          <i className="fa-solid fa-pen" />
        </div>
        <div className="h-fit flex"><p className="italic">~{todo.tags.join(', ')}</p><select name="" id="" className={`${(isEditing)?'block':'hidden'} active:outline-none focus:outline-none`} onInput={handleTagSelect}>
            {tags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
          </select></div>
        <div className={`h-4 mt-3 flex items-center ${(isEditing)?'hidden':'block'}`}>
          <div className={`h-4 w-4 mr-4 border-2 rounded sm ${(isComplete)?'bg-green-700':'bg-white'}`} onClick={() => setIsComplete((prev) => !prev)}></div>
          <i className="fa-solid fa-trash mr-4 cursor-pointer" />
          <i className={`fa-solid ${(expanded)?'fa-down-left-and-up-right-to-center':'fa-up-right-and-down-left-from-center'} mr-4 cursor-pointer`} onClick={() => setExpanded((prev) => (!prev))}/>
        </div>
        <div className={`h-4 mt-3 w-full flex items-center ${(!isEditing)?'hidden':'flex'} justify-center `}>
          <button className="px-3 py-2 rounded-md bg-green-600 text-white mx-2 hover:bg-green-500 active:bg-green-500" onClick={todoChangesSave}><i className="fa-check fa-solid mr-1" ></i>Done</button>
          <button className="px-3 py-2 rounded-md bg-red-600 text-white mx-2 hover:bg-red-500 active:bg-red-500"  onClick={todoChangesCancel}><i className="fa-remove fa-solid mr-1"></i>Cancel</button>
        </div>
      </div>
    </div>
  );
}
