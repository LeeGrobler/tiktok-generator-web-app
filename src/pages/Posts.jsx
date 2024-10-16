import { useContext } from "react";
import { RedditContext } from "../store/reddit-context";
import { Link } from "react-router-dom";

export default function Posts() {
  const { posts } = useContext(RedditContext);

  return (
    <>
      <p>Posts ({posts.length}):</p>
      {posts.map((v) => (
        <div key={v.data.id}>
          <Link to={v.data.id}>{v.data.id}</Link>
        </div>
      ))}
    </>
  );
}
