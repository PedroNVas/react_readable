import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategoryPosts } from '../../actions/PostsActions'
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
    const {postsState} = this.props
    const {posts, success, loading, failed} = postsState

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
    fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts)