import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import router from "./router";
import RedditContextProvider from "./store/reddit-context";
import GeneralContextProvider from "./store/general-context";
import ApiContextProvider from "./store/api-context";

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <GeneralContextProvider>
        <RedditContextProvider>
          <ApiContextProvider>
            <RouterProvider router={router} />
          </ApiContextProvider>
        </RedditContextProvider>
      </GeneralContextProvider>
    </SnackbarProvider>
  );
}
