import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import { TagsProvider } from "../../Context/TagsContext/TagsContext";
import database from "../../Appwrite/database";

export default function MainSection() {
  const { user } = Authentication();
  const [tags, setTags] = useState(null);

  const getTags = async () => {
    if(user){
      const tagList = await database.fetchTags(user.id);
      setTags(tagList);
      if(tagList){
        return true
      }
      else{
        return false
      }
    }
  }

  const addTag = () => {
    console.log('jf')
  }

  const removeTag = () => {
    console.log('jf')
  }

  return (
    <section className="h-[85vh] w-full flex items-center justify-center">
      <TagsProvider value={{ tags, setTags, getTags, addTag, removeTag }}>
        <Outlet />
      </TagsProvider>
    </section>
  );
}
