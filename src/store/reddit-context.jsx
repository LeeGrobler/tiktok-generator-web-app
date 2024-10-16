import { createContext, useReducer } from "react";

export const RedditContext = createContext({
  posts: [],
  addPost: () => {},
});

const reducer = (state, action) => {
  if (action.type === "add-post") {
    return {
      ...state,
      posts: [...state.posts, action.payload],
    };
  }

  return state;
};

export default function RedditContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
  });

  const addPost = (post) => {
    dispatch({
      type: "add-post",
      payload: post,
    });
  };

  const ctxValue = {
    posts: state.posts,
    addPost,
  };

  return (
    <RedditContext.Provider value={ctxValue}>{children}</RedditContext.Provider>
  );
}
