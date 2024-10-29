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
  const { loading, notify } = useContext(GeneralContext);
  const { summary, fetchSummary } = useContext(ApiContext);

  const [post, setPost] = useState(null);

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
      await fetchSummary(post.data);
    };

    processPost();
  }, [posts, location, notify, navigate, fetchSummary, loading]);

  return (
    <>
      <PostAccordion
        loading={loading.reddit}
        title={post?.title}
        content={post?.selftext}
      />

      {post && (
        <>
          <PostAccordion
            loading={loading.summary}
            title="Summary"
            content={summary?.script}
          />
        </>
      )}
    </>
  );
}
