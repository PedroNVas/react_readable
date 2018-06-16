import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/es/CardContent";
import CardHeader from "@material-ui/core/es/CardHeader";
import Grid from "@material-ui/core/es/Grid";
import TextField from "@material-ui/core/es/TextField";
import Typography from "@material-ui/core/es/Typography";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { cancelAddNewComment, createComment } from "../../../actions/CommentsActions";
import AvatarCard from "../../Card/AvatarCard";
import LoadingCard from "../../Card/LoadingCard";
import Confirm from "../../Complementary/Confirm";
import FailedAction from "../../Complementary/FailedAction";

const style = {
  card: {
    margin: "3% 0% 3% 40%",
    width: "40%"
  }
};

export class CreateComment extends PureComponent {

  state = {
    commentAuthor: null,
    commentBody: null,
    showing: null
  };

  static getDerivedStateFromProps (props, state) {
    if (state.commentAuthor === null) {
      return {
        commentAuthor: "",
        commentBody: "",
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

    const { commentCreateState } = this.props;

    const { comment, success, loading, failed } = commentCreateState;

    const { commentAuthor, commentBody, showing } = this.state;

    let content = null;

    const header = (
      <CardHeader
        avatar={
          <AvatarCard voteScore={0} opacity={0.3} />
        }
        subheader={
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} style={{ display: "flex" }}>
              <Typography variant='body2' style={{ margin: "7% 3% 0% 0%" }}>
                {`posted by `}
              </Typography>
              <TextField
                id="author"
                label="Author"
                value={commentAuthor}
                onChange={this.handleChange("commentAuthor")}
                margin="normal"
              />
            </Grid>
          </Grid>
        }
      />
    );

    const body = (
      <CardContent>
        <TextField
          id="body"
          label="Body"
          value={commentBody}
          onChange={this.handleChange("commentBody")}
          margin="normal"
          fullWidth
          multiline
        />
      </CardContent>
    );

    const createComment = (
      <Card
        raised={true}
        style={{ ...style.card, backgroundColor: "#f8fdf6" }}>

        {header}

        {body}

        <Confirm
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelAddNewComment()}
          secondButtonText='Create'
          secondButtonCallback={() =>
            this.props.createComment(comment.id, commentBody, commentAuthor, comment.parentId)} />

      </Card>
    );

    if (failed) {
      content = (
        <div style={{ display: "flex" }}>
          {createComment}
          <FailedAction
            isShowing={showing}
            message="Couldn't create the comment"
            dismissCallback={() => {
              this.setState({ showing: false });
              this.props.cancelAddNewComment();
            }}
            retryCallback={() => this.props.createComment(comment.id, commentBody, commentAuthor, comment.parentId)} />
        </div>
      );
    } else if (loading) {
      content = (
        <LoadingCard content='Creating comment...' backgroundColor="#f8fdf6"
                     cardStyle={style.card} />
      );
    } else if (success) {
      content = createComment;
    } else {
      content = createComment;
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    commentCreateState: state.commentCreate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelAddNewComment: () => dispatch(cancelAddNewComment()),
    createComment: (commentId, commentBody, commentAuthor, postId) => dispatch(createComment(commentId, commentBody, commentAuthor, postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);