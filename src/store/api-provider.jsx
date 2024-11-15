import { useCallback, useContext } from "react";
import { GeneralContext } from "../store/general-context";
import { ApiContext } from "./api-context";

export default function ApiContextProvider({ children }) {
  const { toggleLoading, notify } = useContext(GeneralContext);

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

        return result;
      } catch (error) {
        notify(error.message, "error");
      } finally {
        toggleLoading(null, "summary");
      }
    },
    [toggleLoading, notify]
  );

  const fetchSpeech = useCallback(
    async (summary) => {
      toggleLoading("Synthesizing speech", "speech");

      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/synthesizeSpeech",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              gender: summary.gender,
              script: summary.script,
            }),
          }
        );

        if (!response.ok) {
          const result = await response.json();

          throw new Error(
            result.message ||
              `${response.status} - Unable to synthesize speech.`
          );
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        notify(error.message, "error");
      } finally {
        toggleLoading(null, "speech");
      }
    },
    [toggleLoading, notify]
  );

  const fetchVideo = useCallback(
    async (summary) => {
      toggleLoading("Downloading video", "video");

      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/downloadVideo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              searchTerms: summary.video,
            }),
          }
        );

        if (!response.ok) {
          const result = await response.json();

          throw new Error(
            result.message || `${response.status} - Unable to download video.`
          );
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        notify(error.message, "error");
      } finally {
        toggleLoading(null, "video");
      }
    },
    [toggleLoading, notify]
  );

  const fetchMusic = useCallback(
    async (summary) => {
      toggleLoading("Downloading music", "music");

      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/downloadMusic",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              searchTerms: summary.music,
            }),
          }
        );

        if (!response.ok) {
          const result = await response.json();

          throw new Error(
            result.message || `${response.status} - Unable to download music.`
          );
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        notify(error.message, "error");
      } finally {
        toggleLoading(null, "music");
      }
    },
    [toggleLoading, notify]
  );

  const ctxValue = {
    fetchSummary,
    fetchSpeech,
    fetchVideo,
    fetchMusic,
  };

  return <ApiContext.Provider value={ctxValue}>{children}</ApiContext.Provider>;
}
