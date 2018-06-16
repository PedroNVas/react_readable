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
import LoadingCard from "../Card/LoadingCard";
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
  },
  fontStyle: {
    textAlign: "center",
    fontFamily: "'Raleway', regular",
    fontSize: "15px"
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

  handlePostState = post => {
    if (post.failed) {
      return (
        <div style={{ display: "block" }} key={post.id}>
          <Post
            key={post.id}
            data={post}
            isDetails={true} />

          <div>
            <Typography variant='headline' style={style.fontStyle}>
              Something went wrong... refresh the page
            </Typography>
          </div>
        </div>
      );
    } else if (post.loading) {
      return (
        <LoadingCard
          key={post.id}
          content='Loading post...'
          backgroundColor="#FFFFFF"
          cardStyle={style.card} />
      );
    } else {
      return (
        <Post
          key={post.id}
          data={post}
          isDetails={true} />
      );
    }
  };

  handleCommentState = comment => {
    if (comment.failed) {
      return (
        <div style={{ display: "block" }} key={comment.id}>
          <Comment key={comment.id} data={comment} />

          <div>
            <Typography variant='headline' style={style.fontStyle}>
              Something went wrong... refresh the page
            </Typography>
          </div>
        </div>
      );
    } else if (comment.loading) {
      return (
        <LoadingCard
          key={comment.id}
          content='Loading comment...'
          backgroundColor="#FFFFFF"
          cardStyle={style.card} />
      );
    } else {
      return (
        <Comment key={comment.id} data={comment} />
      );
    }
  };

  render () {

    const { postDetailsState, commentsState, commentCreate } = this.props;

    const message = commentsState.success && commentsState.comments.length === 0 ?
      <Typography variant='headline' align='center' color='textSecondary' style={style.message}>
        {randomCommentsMessages(Math.floor((Math.random() * 6) + 1))}
      </Typography> : null;

    const addNewComment = (
      <Collapse in={true} collapsedHeight="40px">
        <Paper style={style.card}>
          <Button onClick={() => this.props.addNewComment(postDetailsState.post.id)}>
            Create comment
          </Button>
        </Paper>
      </Collapse>
    );

    const newComment = !_.isEmpty(commentCreate) ?
      <CreateComment /> : commentsState.success && addNewComment;

    const comments = (
      <div>
        <Typography variant='body2' style={style.commentsTitle}>
          Comments
        </Typography>
        {commentsState.comments
          .filter(comment => comment.deleted !== true)
          .map(comment => this.handleCommentState(comment))
        }
      </div>
    );

    let content = null;

    if (postDetailsState.failed) {
      content = (
        <Typography variant='body2' style={style.commentsTitle}>
          Failed to load post
        </Typography>
      );
    } else if (postDetailsState.loading) {
      content = (
        <CircularProgress style={style.commentsTitle} />
      );
    }
    else if (postDetailsState.success) {
      content = (
        postDetailsState.post.deleted ?
          <Typography variant='body2' style={style.commentsTitle}>
            Post deleted
          </Typography>
          :
          <div>
            {this.handlePostState(postDetailsState.post)}
            <Divider inset style={{ margin: "2% 0% 0% 0%" }} />
            {message}
            {comments}
            {newComment}
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
    commentCreate: state.commentCreate.comment
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