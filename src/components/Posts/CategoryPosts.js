import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions/PostsActions'
import Post from '../Post/Post'

export class CategoryPosts extends Component {

  static propTypes = {
    category: PropTypes.string.isRequired
  }

  componentDidMount () {
    const {posts} = this.props.postsState

    if (posts.length === 0) {
      this.props.fetchPosts()
    }
  }

  render () {

    const {postsState, category} = this.props
    const {posts} = postsState

    return (
      <div>
        {posts
          .filter(post => post.category === category)
          .map(post => {
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
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts)