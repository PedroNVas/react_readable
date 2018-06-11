import Slide from "@material-ui/core/Slide";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/InfoOutline";
import PropTypes from "prop-types";

import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { favoritePost, unFavoritePost } from "../../actions/PostsActions";
import DeleteConfirmation from "./DeleteConfirmation";
import IconAction from "./IconAction";

const style = {
  slide: {
    display: "grid",
    alignItems: "center",
    margin: "2% 0% 0% 2%"
  }
};

class Actions extends PureComponent {

  static propTypes = {
    isComment: PropTypes.bool.isRequired,
    isDetails: PropTypes.bool.isRequired,
    showing: PropTypes.bool.isRequired,
    data: PropTypes.object,
    deleteCallback: PropTypes.func.isRequired,
    editCallback: PropTypes.func.isRequired
  };

  state = {
    showDeleteConfirmation: false
  };

  closeDeleteConfirmation = () => {
    this.setState({ showDeleteConfirmation: false });
  };

  componentDidUpdate (prevProps, prevState) {
    if (prevState.showDeleteConfirmation && !prevProps.showing) {
      this.closeDeleteConfirmation();
    }
  }

  render () {

    const { showing, isComment, isDetails, data, deleteCallback, editCallback } = this.props;

    const { showDeleteConfirmation } = this.state;

    const deleteConfirmation = (
      <DeleteConfirmation
        isComment={isComment}
        showDeleteConfirmation={showDeleteConfirmation}
        closeDeleteConfirmationCallback={this.closeDeleteConfirmation}
        deleteCallback={deleteCallback} slideStyle={style.slide} />
    );

    return (

      <Slide direction="left" in={showing} style={style.slide} mountOnEnter unmountOnExit>
        {showDeleteConfirmation ?
          deleteConfirmation
          :
          <div>
            <IconAction
              title='Edit'
              icon={<EditIcon />}
              hoverColor='#00910d'
              regularColor='#757575'
              buttonCallback={() => editCallback()} />

            {!isComment && !isDetails &&
            <Link to={`/${data.category}/${data.id}`}>
              <IconAction
                title='Details'
                icon={<InfoIcon />}
                hoverColor='#0010ff'
                regularColor='#757575' />
            </Link>
            }

            <IconAction
              title='Delete'
              icon={<DeleteIcon />}
              hoverColor='#000000'
              regularColor='#757575'
              buttonCallback={() => this.setState({ showDeleteConfirmation: true })} />

          </div>
        }
      </Slide>
    );
  }
}

export default Actions;