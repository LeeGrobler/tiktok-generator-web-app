import { createContext, useCallback, useReducer, useContext } from "react";
import { GeneralContext } from "../store/general-context";

export const ApiContext = createContext({
  summary: {
    gender: "",
    video: [],
    script: "",
  },
  fetchSummary: () => {},
});

const reducer = (state, action) => {
  if (action.type === "set-summary") {
    return {
      ...state,
      summary: action.payload,
    };
  }

  return state;
};

export default function ApiContextProvider({ children }) {
  const { toggleLoading, notify } = useContext(GeneralContext);

  const [state, dispatch] = useReducer(reducer, {
    summary: {
      gender: "",
      video: [],
      script: "",
    },
  });

  const fetchSummary = useCallback(
    async (post) => {
      toggleLoading("Fetching summary", "summary");

      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/summarizePost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              title: post.title,
              content: post.selftext,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || `${response.status} - Unable to retrieve summary.`
          );
        }

        dispatch({
          type: "set-summary",
          payload: result,
        });
      } catch (error) {
        notify(error.message, "error");
      } finally {
        toggleLoading(null, "summary");
      }
    },
    [toggleLoading, notify]
  );

  const ctxValue = {
    summary: state.summary,
    fetchSummary,
  };

  return <ApiContext.Provider value={ctxValue}>{children}</ApiContext.Provider>;
}
