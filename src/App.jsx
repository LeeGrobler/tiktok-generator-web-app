import { RouterProvider } from "react-router-dom";

import router from "./router";
import RedditContextProvier from "./store/reddit-context";
import GeneralContextProvider from "./store/general-context";

export default function App() {
  return (
    <GeneralContextProvider>
      <RedditContextProvier>
        <RouterProvider router={router} />
      </RedditContextProvier>
    </GeneralContextProvider>
  );
}
