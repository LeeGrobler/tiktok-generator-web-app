import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { GeneralContext } from "../store/general-context";

export default function Header() {
  const location = useLocation();

  const { pageHeader } = useContext(GeneralContext);

  return (
    <AppBar position="static">
      <Toolbar>
        {location.pathname !== "/" && (
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageHeader}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
