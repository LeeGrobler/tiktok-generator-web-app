import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useContext,
} from "react";
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
    toggleLoading("Fetching Reddit posts", "reddit");

    try {
      const response = await fetch(
        import.meta.env.VITE_REDDIT_URL.replace(
          "<subreddit>",
          "AmItheAsshole"
        ).replace("<limit>", 3)
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `${response.status} - Unable to retrieve summary.`
        );
      }

      dispatch({
        type: "set-posts",
        payload: result.data.children,
      });
    } catch (error) {
      notify(error.message, "error");
    } finally {
      toggleLoading(null, "reddit");
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
