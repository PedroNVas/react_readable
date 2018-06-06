import Button from '@material-ui/core/es/Button'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewPost, fetchPosts } from '../../actions/PostsActions'
import Post from '../Post/Post'

export class AllPosts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {

    const {postsState} = this.props
    const {posts, success, loading, failed} = postsState

    return (
      <div>
        {posts
          .filter(post => post.deleted !== true)
          .map(post =>
            <Post key={post.id} data={post} isLoading={loading} />
          )}
        <Button onClick={() => this.props.addNewPost()}>
          Create post
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postsState: state.posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    addNewPost: () => dispatch(addNewPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)