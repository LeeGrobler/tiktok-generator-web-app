import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PostAccordion from "../components/PostAccordion";
import { RedditContext } from "../store/reddit-context";
import { GeneralContext } from "../store/general-context";
import { ApiContext } from "../store/api-context";

export default function Post() {
  const location = useLocation();
  const navigate = useNavigate();

  const { posts } = useContext(RedditContext);
  const { loading, notify, setPageHeader } = useContext(GeneralContext);
  const { fetchSummary, fetchSpeech, fetchVideo, fetchMusic } =
    useContext(ApiContext);

  const [post, setPost] = useState(null);
  const [summary, setSummary] = useState(null);
  const [speech, setSpeech] = useState(null);
  const [video, setVideo] = useState(null);
  const [music, setMusic] = useState(null);

  useEffect(() => {
    if (loading.reddit || !posts.length) return;

    const processPost = async () => {
      const post = posts.find(
        (v) => v.data.id === location.pathname.replace("/", "")
      );

      if (!post) {
        notify("Post not found.", "error");
        return navigate("/");
      }

      setPost(post?.data);
      setPageHeader(post.data.title.substring(0, 25) + "...");

      const summary = await fetchSummary(post.data);
      setSummary(summary);

      const [speech, video, music] = await Promise.all([
        fetchSpeech(summary),
        fetchVideo(summary),
        fetchMusic(summary),
      ]);

      setSpeech(speech);
      setVideo(video);
      setMusic(music);
    };

    processPost();
  }, [
    posts,
    location,
    notify,
    navigate,
    fetchSummary,
    loading,
    setPageHeader,
    fetchSpeech,
    fetchVideo,
    fetchMusic,
  ]);

  return (
    <>
      <PostAccordion
        loading={loading.reddit}
        title="Post"
        content={post?.selftext}
      />

      {post && (
        <>
          <PostAccordion
            loading={loading.summary}
            title="Summary"
            content={summary?.script}
          />

          <PostAccordion
            loading={loading.summary || loading.speech}
            title="Speech"
          >
            <audio controls src={speech} />
          </PostAccordion>

          <PostAccordion
            loading={loading.summary || loading.music}
            title="Music"
          >
            <audio controls src={music} />
          </PostAccordion>

          <PostAccordion
            loading={loading.summary || loading.video}
            title="Background Video"
          >
            <video controls className="w-100">
              <source src={video} type="video/webm" />
              <source src={video} type="video/mp4" />
            </video>
          </PostAccordion>
        </>
      )}
    </>
  );
}
