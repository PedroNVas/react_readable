import Slide from "@material-ui/core/es/Slide/Slide";
import Typography from "@material-ui/core/es/Typography/Typography";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Confirm from "./Confirm";

const style = {
  slide: {
    display: "grid",
    alignItems: "center",
    margin: "2% 0% 0% 2%"
  },
  fontStyle: {
    textAlign: "center",
    fontFamily: "'Raleway', regular",
    fontSize: "15px"
  }
};

class FailedAction extends PureComponent {

  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    dismissCallback: PropTypes.func.isRequired,
    retryCallback: PropTypes.func.isRequired
  };

  render () {

    const { isShowing, message, dismissCallback, retryCallback } = this.props;

    return (
      <Slide direction="left" in={isShowing} style={style.slide} mountOnEnter unmountOnExit>
        <div>
          <Typography variant='headline' style={style.fontStyle}>
            {message}
          </Typography>
          <Confirm
            firstButtonText='Dismiss'
            firstButtonCallback={() => dismissCallback()}
            secondButtonText='Try again'
            secondButtonCallback={() => retryCallback()} />
        </div>
      </Slide>
    );
  }
}

export default FailedAction;