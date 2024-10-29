import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardHeader,
  Skeleton,
} from "@mui/material";

export default function PostAccordion({ loading, title, content }) {
  return loading ? (
    <Card>
      <CardHeader
        title={
          <>
            <Skeleton animation="wave" height={10} />
          </>
        }
      />
    </Card>
  ) : (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <span className={!content ? "text-red-600" : null}>{title}</span>
      </AccordionSummary>
      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  );
}
