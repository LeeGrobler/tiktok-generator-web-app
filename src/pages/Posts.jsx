import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Skeleton,
  Card,
  CardHeader,
  ListItemText,
  ListItemButton,
  Paper,
} from "@mui/material";

import { RedditContext } from "../store/reddit-context";
import { GeneralContext } from "../store/general-context";

export default function Posts() {
  const { posts } = useContext(RedditContext);
  const {
    loading: { reddit: loading },
    setPageHeader,
  } = useContext(GeneralContext);

  useEffect(() => {
    setPageHeader("r/AmItheAsshole");
  }, [setPageHeader]);

  if (loading) {
    return [...Array(3).keys()].map((v) => (
      <Card key={v} sx={{ my: v > 0 ? 1 : 0 }}>
        <CardHeader
          title={
            <>
              <Skeleton animation="wave" height={10} />
            </>
          }
        />
      </Card>
    ));
  }

  return (
    <>
      {posts.map((v) => (
        <Link
          key={v.data.id}
          to={`/${v.data.id}`}
          style={{ textDecoration: "none" }}
        >
          <Paper
            elevation={3}
            sx={{ mb: 2, p: 1, backgroundColor: "background.paper" }}
          >
            <ListItemButton>
              <ListItemText primary={v.data.title} />
            </ListItemButton>
          </Paper>
        </Link>
      ))}
    </>
  );
}
