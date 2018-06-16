import Button from "@material-ui/core/es/Button/Button";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import _ from "underscore";
import { randomPostMessages } from "../../utils/AppUtils";
import LoadingCard from "../Card/LoadingCard";
import CreatePost from "../Post/Mode/CreatePost";
import Post from "../Post/Post";

const style = {
  card: {
    textAlign: "center",
    margin: "2% 0% 1% 20%",
    width: "60%",
    backgroundColor: "#f8fdf6"
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

class Posts extends PureComponent {

  static propTypes = {
    postsState: PropTypes.object.isRequired,
    postCreate: PropTypes.object.isRequired,
    category: PropTypes.string,
    addPost: PropTypes.func.isRequired
  };

  handlePostState = post => {
    if (post.failed) {
      return (
        <div style={{ display: "block" }} key={post.id}>
          <Post
            key={post.id}
            data={post}
            isDetails={false} />

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
          isDetails={false} />
      );
    }
  };

  render () {

    const { postsState, postCreate, category } = this.props;

    const message = postsState.success && postsState.posts.length === 0 ?
      <Typography variant='headline' align='center' color='textSecondary' style={style.message}>
        {randomPostMessages(Math.floor((Math.random() * 6) + 1))}
      </Typography> : null;

    const addNewPost = (
      <Collapse in={true} collapsedHeight="40px">
        <Paper style={style.card}>
          <Button onClick={() => this.props.addPost()}>
            {category ? `Create ${category} post` : "Create post"}
          </Button>
        </Paper>
      </Collapse>
    );

    const newPost = !_.isEmpty(postCreate) ? <CreatePost /> : postsState.success && addNewPost;

    let content = null;

    if (postsState.failed) {
      content = (
        <Typography variant='body2' style={{ ...style.message, margin: "5% 30% 0% 30%" }}>
          Failed to load posts
        </Typography>
      );
    } else if (postsState.loading) {
      content = (
        <CircularProgress style={{ margin: "5% 30% 0% 30%" }} />
      );
    } else {
      content = (
        <div>
          {message}
          {postsState.posts.filter(post => !post.deleted).map(post => this.handlePostState(post))}
          {newPost}
        </div>
      );
    }

    return content;
  }

}

export default Posts;