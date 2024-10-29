import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../store/general-context";

export default function StatusBar() {
  const { loading: loadingObj } = useContext(GeneralContext);
  const [message, setMessage] = useState();

  const loading = JSON.stringify(loadingObj);

  useEffect(() => {
    const status = Object.values(loadingObj).find(Boolean);
    setMessage(status);
  }, [loading, loadingObj]);

  return <div className="fixed bottom-0 w-full text-center">{message}</div>;
}
