import { createContext, useContext } from "react";

const TagsContext = createContext({
    tags: null,
});

export const TagsProvider = TagsContext.Provider;

export const Tags = () => {
    return useContext(TagsContext);
}