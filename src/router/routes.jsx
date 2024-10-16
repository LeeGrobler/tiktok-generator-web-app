import Posts from "../pages/Posts";
import Post from "../pages/Post";

export default [
  { index: true, element: <Posts /> },
  { path: "/:id", element: <Post /> },
];
