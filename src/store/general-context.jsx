import { createContext } from "react";

export const GeneralContext = createContext({
  loading: {
    reddit: null,
    summary: null,
    speech: null,
    video: null,
    music: null,
  },
  pageHeader: null,
  toggleLoading: () => {},
  notify: () => {},
  setPageHeader: () => {},
});
