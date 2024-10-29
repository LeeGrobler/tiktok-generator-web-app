import GeneralProvider from "./general-context";
import RedditProvider from "./reddit-context";
import ApiProvider from "./api-context";

export default function ContextProvider({ children }) {
  return (
    <GeneralProvider>
      <RedditProvider>
        <ApiProvider>{children}</ApiProvider>
      </RedditProvider>
    </GeneralProvider>
  );
}
