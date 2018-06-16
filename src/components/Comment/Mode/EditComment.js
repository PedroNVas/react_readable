import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/es/TextField";
import React, { Component } from "react";
import { connect } from "react-redux";
import { cancelEditComment, updateComment } from "../../../actions/CommentsActions";
import AvatarCard from "../../Card/AvatarCard";
import LoadingCard from "../../Card/LoadingCard";
import SubHeaderCard from "../../Card/SubHeaderCard";
import Confirm from "../../Complementary/Confirm";
import FailedAction from "../../Complementary/FailedAction";

const style = {
  card: {
    margin: "3% 0% 0% 40%",
    width: "40%"
  }
};

export class EditComment extends Component {

  state = {
    commentBody: null,
    showing: null
  };

  static getDerivedStateFromProps (props, state) {
    const { comment } = props.commentEditState;
    if (state.commentBody === null) {
      return {
        commentBody: comment.body,
        showing: true
      };
    }
    return null;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render () {

    const { commentEditState } = this.props;
    const { comment, success, loading, failed } = commentEditState;

    const { commentBody, showing } = this.state;

    const header = (
      <CardHeader
        avatar={
          <AvatarCard voteScore={comment.voteScore} opacity={0.3} />
        }
        subheader={
          <SubHeaderCard author={comment.author} timestamp={comment.timestamp} opacity={0.3} />
        }
      />
    );

    const body = (
      <CardContent>
        <TextField
          id="body"
          label="Edit body"
          value={commentBody}
          onChange={this.handleChange("commentBody")}
          margin="normal"
          fullWidth
          multiline
        />
      </CardContent>
    );

    const editComment = (
      <Card raised={true}
            style={{ ...style.card, backgroundColor: "#fdfaf4" }}>

        {header}

        {body}

        <Confirm
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelEditComment()}
          secondButtonText='Edit'
          secondButtonCallback={() => this.props.updateComment(comment.id, commentBody)} />

      </Card>
    );

    let content = null;

    if (failed) {
      content = (
        <div style={{ display: "flex" }}>
          {editComment}
          <FailedAction
            isShowing={showing}
            message="Couldn't edit the comment"
            dismissCallback={() => {
              this.setState({ showing: false });
              this.props.cancelEditComment();
            }}
            retryCallback={() => this.props.updateComment(comment.id, commentBody)} />
        </div>
      );
    } else if (loading) {
      content = (
        <LoadingCard content='Editing post...' backgroundColor="#fdfaf4"
                     cardStyle={style.card} />
      );
    } else if (success) {
      content = editComment;
    } else {
      content = editComment;
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    commentEditState: state.commentEdit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelEditComment: () => dispatch(cancelEditComment()),
    updateComment: (commentId, commentBody) => dispatch(updateComment(commentId, commentBody))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);