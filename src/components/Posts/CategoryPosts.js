import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewCategoryPost, fetchCategoryPosts } from "../../actions/PostsActions";
import Posts from "./Posts";

export class CategoryPosts extends Component {

  static propTypes = {
    fetchCategoryPosts: PropTypes.func.isRequired
  };

  state = {
    urlCategory: null
  };

  static getDerivedStateFromProps (props, state) {
    const { category } = props.match.params;
    if (category !== state) {
      return {
        urlCategory: category
      };
    }
    return null;
  }

  componentDidMount () {
    const { category } = this.props.match.params;
    this.props.fetchCategoryPosts(category);
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.urlCategory !== prevState.urlCategory) {
      const { category } = this.props.match.params;
      this.props.fetchCategoryPosts(category);
    }
  }

  render () {

    const { category } = this.props.match.params;
    const { categoryPostsState, postCreate } = this.props;

    return (
      <Posts
        postsState={categoryPostsState}
        postCreate={postCreate}
        addPost={() => this.props.addNewCategoryPost(category)}
        category={category} />
    );
  }

}

const mapStateToProps = state => {
  return {
    categoryPostsState: state.categoryPosts,
    postCreate: state.postCreate.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
    addNewCategoryPost: category => dispatch(addNewCategoryPost(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts);