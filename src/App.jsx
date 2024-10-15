import Header from "./components/Header";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  return (
    <>
      <Header title="Header"></Header>

      <main className="p-4">
        <p className="text-3xl font-bold underline uppercase">hello world</p>
        <p>api key: {apiKey}</p>
      </main>
    </>
  );
}
