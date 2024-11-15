import { createContext } from "react";

export const ApiContext = createContext({
  fetchSummary: () => {},
  fetchSpeech: () => {},
  fetchVideo: () => {},
  fetchMusic: () => {},
});
