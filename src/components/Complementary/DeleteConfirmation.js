import Grid from "@material-ui/core/es/Grid";
import Tooltip from "@material-ui/core/es/Tooltip";
import Typography from "@material-ui/core/es/Typography";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";

import React, { PureComponent } from "react";

const style = {
  icons: {
    textAlign: "center"
  }
};

class DeleteConfirmation extends PureComponent {

  static propTypes = {
    isComment: PropTypes.bool.isRequired,
    showDeleteConfirmation: PropTypes.bool.isRequired,
    closeDeleteConfirmationCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func.isRequired,
    slideStyle: PropTypes.object.isRequired
  };

  state = {
    isCancelHovered: false,
    isDeleteHovered: false
  };

  render () {

    const {
      isComment, showDeleteConfirmation, deleteCallback,
      closeDeleteConfirmationCallback, slideStyle
    } = this.props;

    const { isCancelHovered, isDeleteHovered } = this.state;

    return (
      <Slide direction="left"
             in={showDeleteConfirmation}
             mountOnEnter
             unmountOnExit
             style={slideStyle}>
        <div>
          <Grid container spacing={8} justify='center'>
            <Grid item xs={12} sm={12}>
              <Typography component="p" gutterBottom align='center'>
                Are you sure you want to delete the {isComment ? "comment" : "post"}?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={style.icons}>
              <Tooltip title='Cancel' placement='bottom'>
                <IconButton
                  style={{ color: isCancelHovered ? "#ff0006" : "#757575" }}
                  onMouseEnter={() => this.setState({ isCancelHovered: true })}
                  onMouseLeave={() => this.setState({ isCancelHovered: false })}
                  onClick={() => closeDeleteConfirmationCallback()}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} style={style.icons}>
              <Tooltip title='Delete' placement='bottom'>
                <IconButton
                  style={{ color: isDeleteHovered ? "#000000" : "#757575" }}
                  onMouseEnter={() => this.setState({ isDeleteHovered: true })}
                  onMouseLeave={() => this.setState({ isDeleteHovered: false })}
                  onClick={() => deleteCallback()}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </Slide>
    );
  }

}

export default DeleteConfirmation;