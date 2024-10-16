import { RouterProvider } from "react-router-dom";

import router from "./router";
import RedditContextProvier from "./store/reddit-context";

export default function App() {
  return (
    <RedditContextProvier>
      <RouterProvider router={router} />
    </RedditContextProvier>
  );
}
