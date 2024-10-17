import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import router from "./router";
import RedditContextProvier from "./store/reddit-context";
import GeneralContextProvider from "./store/general-context";

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <GeneralContextProvider>
        <RedditContextProvier>
          <RouterProvider router={router} />
        </RedditContextProvier>
      </GeneralContextProvider>
    </SnackbarProvider>
  );
}
