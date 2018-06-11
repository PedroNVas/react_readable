import Button from "@material-ui/core/es/Button/Button";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import _ from "underscore";
import { randomPostMessages } from "../../utils/AppUtils";
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
  }
};

class Posts extends PureComponent {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    postsState: PropTypes.object.isRequired,
    postCreateState: PropTypes.object.isRequired,
    category: PropTypes.string,
    addPost: PropTypes.func.isRequired
  };

  render () {

    const { postsState, postCreateState, category } = this.props;

    const newPost = !_.isEmpty(postCreateState.post) ? <CreatePost /> : null;

    let content = null;

    const message = postsState.posts.length === 0 ?
      <Typography variant='headline' align='center' color='textSecondary' style={style.message}>
        {randomPostMessages(Math.floor((Math.random() * 6) + 1))}
      </Typography> : null;


    return (
      <div>
        {message}
        {postsState.posts
          .filter(post => post.deleted !== true)
          .map(post =>
            <Post key={post.id} data={post} isLoading={postsState.loading} isDetails={false} />
          )}
        {newPost}
        {newPost === null &&
        <Collapse in={true} collapsedHeight="40px">
          <Paper style={style.card}>
            <Button onClick={() => this.props.addPost()}>
              {category ? `Create ${category} post` : "Create post"}
            </Button>
          </Paper>
        </Collapse>
        }
      </div>
    );
  }

}

export default Posts;