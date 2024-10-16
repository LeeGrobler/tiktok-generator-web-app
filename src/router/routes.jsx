import Posts from "../pages/Posts";
import Post from "../pages/Post";
import MainLayout from "../layouts/MainLayout";

export default [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Posts /> },
      { path: "/:id", element: <Post /> },
    ],
  },
];
