import GeneralProvider from "./general-provider";
import RedditProvider from "./reddit-provider";
import ApiProvider from "./api-provider";

export default function ContextProvider({ children }) {
  return (
    <GeneralProvider>
      <RedditProvider>
        <ApiProvider>{children}</ApiProvider>
      </RedditProvider>
    </GeneralProvider>
  );
}
