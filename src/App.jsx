import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import router from "./router";
import ContextProvider from "./store/context";
import StatusBar from "./components/StatusBar";

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <ContextProvider>
        <RouterProvider router={router} />
        <StatusBar />
      </ContextProvider>
    </SnackbarProvider>
  );
}
