import { createContext, useEffect, useReducer } from "react";

import { useContext } from "react";
import { GeneralContext } from "../store/general-context";

export const RedditContext = createContext({
  posts: [],
  fetchPosts: () => {},
});

const reducer = (state, action) => {
  if (action.type === "set-posts") {
    return {
      ...state,
      posts: action.payload,
    };
  }

  return state;
};

export default function RedditContextProvider({ children }) {
  const { notify } = useContext(GeneralContext);

  const [state, dispatch] = useReducer(reducer, {
    posts: [],
  });

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      notify(error);
    }
  }, [notify]);

  const fetchPosts = async () => {
    const response = await fetch(
      "https://www.reddit.com/r/AmItheAsshole/top.json?limit=5"
    );

    if (!response.ok) {
      throw new Error("Unable to retrieve Reddit posts.");
    }

    const result = await response.json();

    return dispatch({
      type: "set-posts",
      payload: result.data.children,
    });
  };

  const ctxValue = {
    posts: state.posts,
    fetchPosts,
  };

  return (
    <RedditContext.Provider value={ctxValue}>{children}</RedditContext.Provider>
  );
}
