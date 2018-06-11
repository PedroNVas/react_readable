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
import Confirm from "../../Complementary/Confirm";

const style = {
  card: {
    margin: "3% 0% 3% 40%",
    width: "40%"
  }
};

export class CreateComment extends PureComponent {

  state = {
    commentAuthor: null,
    commentBody: null
  };

  static getDerivedStateFromProps (props, state) {
    if (state.commentAuthor === null) {
      return {
        commentAuthor: "",
        commentBody: ""
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

    const { comment } = this.props.commentCreateState;
    const { commentAuthor, commentBody } = this.state;

    return (
      <Card
        raised={true}
        style={{ ...style.card, backgroundColor: "#f8fdf6" }}>
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

        <Confirm
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelAddNewComment()}
          secondButtonText='Create'
          secondButtonCallback={() =>
            this.props.createComment(comment.id, commentBody, commentAuthor, comment.parentId)} />

      </Card>
    );
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