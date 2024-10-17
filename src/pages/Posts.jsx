import { Link } from "react-router-dom";

import { useContext } from "react";
import { RedditContext } from "../store/reddit-context";
import { GeneralContext } from "../store/general-context";

export default function Posts() {
  const { posts } = useContext(RedditContext);
  const { loading } = useContext(GeneralContext);

  return (
    <>
      <p>Posts ({posts.length}):</p>
      {loading
        ? "loading..."
        : posts.map((v) => (
            <div key={v.data.id}>
              <Link to={v.data.id}>{v.data.id}</Link>
            </div>
          ))}
    </>
  );
}
