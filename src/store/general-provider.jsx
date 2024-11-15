import { useReducer, useCallback } from "react";
import { useSnackbar } from "notistack";
import { GeneralContext } from "./general-context";

const reducer = (state, action) => {
  if (action.type === "set-loading") {
    const newState = { ...state };
    newState.loading[action.payload.target] = action.payload.loading;
    return newState;
  }

  if (action.type === "set-page-header") {
    return {
      ...state,
      pageHeader: action.payload,
    };
  }

  return state;
};

export default function GeneralContextProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const [{ loading, pageHeader }, dispatch] = useReducer(reducer, {
    loading: {
      reddit: null,
      summary: null,
      speech: null,
      video: null,
      music: null,
    },
    pageHeader: null,
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

  const setPageHeader = useCallback((header) => {
    dispatch({
      type: "set-page-header",
      payload: header,
    });
  }, []);

  const ctxValue = {
    loading,
    pageHeader,
    toggleLoading,
    notify,
    setPageHeader,
  };

  return (
    <GeneralContext.Provider value={ctxValue}>
      {children}
    </GeneralContext.Provider>
  );
}
