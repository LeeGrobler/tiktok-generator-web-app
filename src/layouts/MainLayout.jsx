import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "../components/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function MainLayout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Header title="Header" />

      <main className="p-4">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
