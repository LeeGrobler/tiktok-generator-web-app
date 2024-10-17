import { createContext, useReducer, useCallback } from "react";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const toggleLoading = useCallback((loading) => {
    dispatch({
      type: "set-loading",
      payload: loading,
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
