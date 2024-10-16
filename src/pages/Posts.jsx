import { useContext } from "react";
import { RedditContext } from "../store/reddit-context";

export default function Posts() {
  const { posts, addPost } = useContext(RedditContext);

  return (
    <>
      <button onClick={() => addPost(Math.random())}>Add Post</button>
      <p>
        Posts ({posts.length}): {posts}
      </p>
    </>
  );
}
