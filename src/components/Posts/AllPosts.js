import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewPost, fetchPosts } from "../../actions/PostsActions";
import Posts from "./Posts";

export class AllPosts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchPosts();
  }

  render () {

    const { postsState, postCreateState } = this.props;

    return (
      <Posts
        posts={postsState.posts}
        postsState={postsState}
        postCreateState={postCreateState}
        addPost={() => this.props.addNewPost()} />
    );
  }
}

const mapStateToProps = state => {
  return {
    postsState: state.posts,
    postCreateState: state.postCreate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    addNewPost: () => dispatch(addNewPost())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);