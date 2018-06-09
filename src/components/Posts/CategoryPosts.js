import Button from '@material-ui/core/es/Button'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { addNewCategoryPost, fetchCategoryPosts } from '../../actions/PostsActions'
import CreatePost from '../Post/Mode/CreatePost'
import Post from '../Post/Post'

export class CategoryPosts extends Component {

  static propTypes = {
    fetchCategoryPosts: PropTypes.func.isRequired,
  }

  state = {
    urlCategory: null,
  }

  static getDerivedStateFromProps (props, state) {
    const {category} = props.match.params
    if (category !== state) {
      return {
        urlCategory: category
      }
    }
    return null
  }

  componentDidMount () {
    const {category} = this.props.match.params
    this.props.fetchCategoryPosts(category)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.urlCategory !== prevState.urlCategory) {
      const {category} = this.props.match.params
      this.props.fetchCategoryPosts(category)
    }
  }

  render () {

    const {category} = this.props.match.params
    const {categoryPostsState, postCreateState} = this.props
    const {posts, success, loading, failed} = categoryPostsState

    const newPost = !_.isEmpty(postCreateState.post) ? <CreatePost /> : null

    return (
      <div>
        {posts
          .filter(post => post.deleted !== true)
          .map(post =>
            <Post key={post.id} data={post} isLoading={loading} isDetails={false} />
          )}
        {newPost}
        {newPost === null &&
        <Button onClick={() => this.props.addNewCategoryPost(category)}>
          {`Create ${category} post`}
        </Button>
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    categoryPostsState: state.categoryPosts,
    postCreateState: state.postCreate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
    addNewCategoryPost: category => dispatch(addNewCategoryPost(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts)