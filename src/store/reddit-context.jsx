import { createContext } from "react";

export const RedditContext = createContext({
  posts: [],
  fetchPosts: () => {},
});
