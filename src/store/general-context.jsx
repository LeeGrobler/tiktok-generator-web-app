import { createContext, useReducer, useCallback } from "react";
import { useSnackbar } from "notistack";

export const GeneralContext = createContext({
  loading: {
    reddit: null,
    summary: null,
  },
  toggleLoading: () => {},
  notify: () => {},
});

const reducer = (state, action) => {
  if (action.type === "set-loading") {
    const newState = { ...state };
    newState.loading[action.payload.target] = action.payload.loading;
    return newState;
  }

  return state;
};

export default function GeneralContextProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: {
      reddit: null,
      summary: null,
    },
  });

  const toggleLoading = useCallback((loading, target) => {
    dispatch({
      type: "set-loading",
      payload: { loading, target },
    });
  }, []);

  const notify = useCallback(
    // variants: success, info, warning, error
    (message, type) => enqueueSnackbar(message, { variant: type || "info" }),
    [enqueueSnackbar]
  );

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
