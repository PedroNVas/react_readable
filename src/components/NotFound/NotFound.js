import Card from "@material-ui/core/es/Card/Card";
import IconButton from "@material-ui/core/es/IconButton";
import Tooltip from "@material-ui/core/es/Tooltip";
import Typography from "@material-ui/core/es/Typography/Typography";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { Link } from "react-router-dom";

const style = {
  card: {
    margin: "2% 0% 0% 20%",
    width: "60%",
    backgroundColor: "#ffbcb9"
  },
  commentsTitle: {
    textAlign: "center",
    fontFamily: "'Raleway', regular",
    color: "#000000"
  },
  icon: {
    fontSize: "40px",
    color: "#000000"
  }
};

export default function NotFound() {
  return (
    <Card raised style={style.card}>
      <Typography variant="display3" style={style.commentsTitle}>
        Not found...
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Tooltip title="Go back home">
          <Link to="/">
            <IconButton>
              <HomeIcon style={style.icon} />
            </IconButton>
          </Link>
        </Tooltip>
      </div>
    </Card>
  );
}
