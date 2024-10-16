import { createContext } from "react";

export const GeneralContext = createContext({
  notify: () => {},
});

export default function GeneralContextProvider({ children }) {
  const notify = (message) => {
    console.log("notifying you of:", message);
  };

  const ctxValue = {
    notify,
  };

  return (
    <GeneralContext.Provider value={ctxValue}>
      {children}
    </GeneralContext.Provider>
  );
}
