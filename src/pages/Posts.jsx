import { useContext } from "react";
// import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Skeleton,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  CardHeader,
} from "@mui/material";

import { RedditContext } from "../store/reddit-context";
import { GeneralContext } from "../store/general-context";

export default function Posts() {
  const { posts } = useContext(RedditContext);
  const { loading } = useContext(GeneralContext);

  if (loading) {
    return [...Array(5).keys()].map((v) => (
      <Card key={v} sx={{ my: v > 0 ? 1 : 0 }}>
        <CardHeader
          title={
            <>
              <Skeleton animation="wave" height={10} />
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
        <Accordion key={v.data.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            {v.data.title}
          </AccordionSummary>
          <AccordionDetails>{v.data.selftext}</AccordionDetails>
          <AccordionActions>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      ))}
    </>
  );
}
