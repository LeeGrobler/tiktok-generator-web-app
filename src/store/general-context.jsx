import { createContext, useReducer, useCallback } from "react";

export const GeneralContext = createContext({
  loading: false,
  toggleLoading: () => {},
  notify: () => {},
});

const reducer = (state, action) => {
  if (action.type === "set-loading") {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
};

export default function GeneralContextProvider({ children }) {
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const toggleLoading = useCallback((loading) => {
    dispatch({
      type: "set-loading",
      payload: loading,
    });
  }, []);

  const notify = useCallback((message) => {
    console.log("notifying you of:", message);
  }, []);

  const ctxValue = {
    loading,
    toggleLoading,
    notify,
  };

  return (
    <GeneralContext.Provider value={ctxValue}>
      {children}
    </GeneralContext.Provider>
  );
}
