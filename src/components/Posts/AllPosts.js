import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions/PostsActions'
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
        {posts.map(post => {
          return post.deleted ? null : <Post key={post.id} data={post} />
        })}
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
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)