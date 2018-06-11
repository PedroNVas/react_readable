import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

const style = {
  iconButton: {
    textAlign: "right"
  }
};

class Confirm extends PureComponent {

  static propTypes = {
    firstButtonText: PropTypes.string.isRequired,
    firstButtonCallback: PropTypes.func.isRequired,

    secondButtonText: PropTypes.string.isRequired,
    secondButtonCallback: PropTypes.func.isRequired
  };

  render () {

    const { firstButtonText, firstButtonCallback, secondButtonText, secondButtonCallback } = this.props;

    return (
      <Grid container spacing={24} justify='center'>
        <Grid item xs={12} sm={12} style={style.iconButton}>
          <Button
            color="secondary"
            onClick={() => firstButtonCallback()}>
            {firstButtonText}
          </Button>
          <Button
            color="primary"
            onClick={() => secondButtonCallback()}>
            {secondButtonText}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Confirm;