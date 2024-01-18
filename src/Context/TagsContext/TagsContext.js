import { createContext, useContext } from "react";

const TagsContext = createContext({
    tags: null,
    getTags: () => { },
    addTag: () => { },
    removeTag: () => { },
});

export const TagsProvider = TagsContext.Provider;

export const Tags = () => {
    return useContext(TagsContext);
}