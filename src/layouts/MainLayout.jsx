import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <Header title="Header" />

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}