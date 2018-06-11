import Button from "@material-ui/core/es/Button";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import Divider from "@material-ui/core/es/Divider/Divider";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { addNewComment, fetchPostComments } from "../../actions/CommentsActions";
import { fetchPostDetails } from "../../actions/PostsActions";
import { randomCommentsMessages } from "../../utils/AppUtils";
import Comment from "../Comment/Comment";
import CreateComment from "../Comment/Mode/CreateComment";
import Post from "../Post/Post";

const style = {
  card: {
    textAlign: "center",
    margin: "3% 0% 1% 40%",
    width: "40%",
    backgroundColor: "#f8fdf6"
  },
  commentsTitle: {
    margin: "2% 0% 0% 15%",
    fontFamily: "'Raleway', regular",
    fontSize: "45px"
  },
  message: {
    fontFamily: "'Raleway', regular",
    fontSize: "25px"
  }
};

export class PostDetails extends Component {

  static propTypes = {
    fetchPostDetails: PropTypes.func.isRequired
  };

  state = {
    urlPostId: null
  };

  static getDerivedStateFromProps (props, state) {
    const { postId } = props.match.params;
    if (postId !== state) {
      return {
        urlPostId: postId
      };
    }
    return null;
  }

  componentDidMount () {
    const { postId } = this.props.match.params;
    this.props.fetchPostDetails(postId);
  }

  render () {

    const { postDetailsState, commentsState, commentCreateState } = this.props;
    const { post, loading } = postDetailsState;

    const newComment = !_.isEmpty(commentCreateState.comment) ? <CreateComment /> : null;

    let content = <CircularProgress />;

    const message = commentsState.comments.length === 0 ?
      <Typography variant='headline' align='center' color='textSecondary' style={style.message}>
        {randomCommentsMessages(Math.floor((Math.random() * 6) + 1))}
      </Typography> : null;

    const comments = (
      <div>
        <Typography variant='body2' style={style.commentsTitle}>
          Comments
        </Typography>
        {commentsState.comments
          .filter(comment => comment.deleted !== true)
          .map(comment =>
            <Comment key={comment.id} data={comment} isLoading={loading} />
          )}
      </div>
    );

    if (postDetailsState.failed) {
      content = (
        <Typography variant='body2' style={style.commentsTitle}>
          Failed to load post
        </Typography>
      );
    } else if (postDetailsState.success) {
      content = (
        post.deleted ?
          <Typography variant='body2' style={style.commentsTitle}>
            Post deleted
          </Typography>
          :
          <div>
            <Post key={post.id} data={post} isLoading={loading} isDetails={true} />
            <Divider inset style={{ margin: "2% 0% 0% 0%" }} />
            {message}
            {comments}
            {newComment}
            {newComment === null &&
            <Collapse in={true} collapsedHeight="40px">
              <Paper style={style.card}>
                <Button onClick={() => this.props.addNewComment(post.id)}>
                  Create comment
                </Button>
              </Paper>
            </Collapse>
            }
          </div>
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    postDetailsState: state.postDetails,
    commentsState: state.comments,
    commentCreateState: state.commentCreate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPostDetails: postId => dispatch(fetchPostDetails(postId)),
    fetchPostComments: postId => dispatch(fetchPostComments(postId)),
    addNewComment: parentId => dispatch(addNewComment(parentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);