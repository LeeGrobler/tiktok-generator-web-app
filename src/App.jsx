import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import router from "./router";
import ContextProvider from "./store/context";

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <ContextProvider>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        />
      </ContextProvider>
    </SnackbarProvider>
  );
}
