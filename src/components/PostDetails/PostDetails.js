import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostDetails } from '../../actions/PostsActions'
import Post from '../Post/Post'

export class PostDetails extends Component {

  static propTypes = {
    fetchPostDetails: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const postId = this.props.match.params.id
    this.props.fetchPostDetails(postId)
  }

  render () {

    const {postDetails} = this.props
    const {post, success, loading, failed} = postDetails

    let content = null

    if (failed) {
      content = (
        <div>
          Failed to load
        </div>
      )
    } else if (loading) {
      content = (
        <div>
          <p>Loading</p>
          <CircularProgress />
        </div>
      )
    } else if (success) {
      content = (
        post.deleted ? <div>Post deleted</div> : <Post key={post.id} data={post} />
      )
    }

    return content
  }
}

const mapStateToProps = state => {
  return {
    postDetails: state.postDetails,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostDetails: postId => dispatch(fetchPostDetails(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)