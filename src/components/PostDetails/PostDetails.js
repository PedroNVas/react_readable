import Button from '@material-ui/core/es/Button'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewComment, fetchPostComments } from '../../actions/CommentsActions'
import { fetchPostDetails } from '../../actions/PostsActions'
import Comment from '../Comment/Comment'
import Post from '../Post/Post'

export class PostDetails extends Component {

  static propTypes = {
    fetchPostDetails: PropTypes.func.isRequired,
  }

  state = {
    urlPostId: null,
  }

  static getDerivedStateFromProps (props, state) {
    const {postId} = props.match.params
    if (postId !== state) {
      return {
        urlPostId: postId
      }
    }
    return null
  }

  componentDidMount () {
    const {postId} = this.props.match.params
    this.props.fetchPostDetails(postId)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.urlPostId !== prevState.urlPostId) {
      const {postId} = this.props.match.params
      this.props.fetchPostDetails(postId)
    }
  }

  render () {

    const {postDetails} = this.props
    const {post, comments, success, loading, failed} = postDetails

    let content = null

    // TODO - THIS IS CAUSING THE BLINKING, THINK A BETTER WAY TO MITIGATE
    // Basically loading keep going forward and back
    // and it renders loading, and success, loading and success
    if (failed) {
      content = (
        <div>
          Failed to load
        </div>
      )
    } else if (success) {
      content = (
        post.deleted ?
          <div>Post deleted</div> : (
            <div>
              <Post key={post.id} data={post} isLoading={loading} />
              <p>Comments</p>
              {comments
                .filter(comment => comment.deleted !== true)
                .map(comment =>
                  <Comment key={comment.id} data={comment} isLoading={loading} />
                )}
              <Button onClick={() => this.props.addNewComment(post.id)}>
                Create comment
              </Button>
            </div>
          )
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
    fetchPostDetails: postId => dispatch(fetchPostDetails(postId)),
    fetchPostComments: postId => dispatch(fetchPostComments(postId)),
    addNewComment: parentId => dispatch(addNewComment(parentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)