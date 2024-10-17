import { createContext, useCallback, useEffect, useReducer } from "react";

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
  const { toggleLoading, notify } = useContext(GeneralContext);

  const [state, dispatch] = useReducer(reducer, {
    posts: [],
  });

  const fetchPosts = useCallback(async () => {
    toggleLoading(true);

    try {
      const response = await fetch(
        "https://www.reddit.com/r/AmItheAsshole/top.json?limit=3"
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve Reddit posts.");
      }

      const result = await response.json();

      dispatch({
        type: "set-posts",
        payload: result.data.children,
      });
    } catch (error) {
      notify(error.message, "error");
    } finally {
      toggleLoading(false);
    }
  }, [toggleLoading, notify]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const ctxValue = {
    posts: state.posts,
    fetchPosts,
  };

  return (
    <RedditContext.Provider value={ctxValue}>{children}</RedditContext.Provider>
  );
}
