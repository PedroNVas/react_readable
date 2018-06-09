import Button from '@material-ui/core/es/Button'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { addNewPost, fetchPosts } from '../../actions/PostsActions'
import CreatePost from '../Post/Mode/CreatePost'
import Post from '../Post/Post'

export class AllPosts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {

    const {postsState, postCreateState} = this.props
    const {posts, success, loading, failed} = postsState

    const newPost = !_.isEmpty(postCreateState.post) ? <CreatePost /> : null

    return (
      <div>
        {posts
          .filter(post => post.deleted !== true)
          .map(post =>
            <Post key={post.id} data={post} isLoading={loading} isDetails={false}/>
          )}
        {newPost}
        {newPost === null &&
        <Button onClick={() => this.props.addNewPost()}>
          Create post
        </Button>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postsState: state.posts,
    postCreateState: state.postCreate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    addNewPost: () => dispatch(addNewPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)