import Button from '@material-ui/core/es/Button'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { addNewComment, fetchPostComments } from '../../actions/CommentsActions'
import { fetchPostDetails } from '../../actions/PostsActions'
import Comment from '../Comment/Comment'
import CreateComment from '../Comment/Mode/CreateComment'
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

    const {comments} = this.props.commentsState

    if (this.state.urlPostId !== prevState.urlPostId
      || comments.length !== prevProps.commentsState.comments.length) {
      const {postId} = this.props.match.params
      this.props.fetchPostDetails(postId)
    }
  }

  render () {

    const {postDetailsState, commentsState, commentCreateState} = this.props
    const {post, success, loading, failed} = postDetailsState
    const {comments} = commentsState

    const newComment = !_.isEmpty(commentCreateState.comment) ? <CreateComment /> : null

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
          <div>Post Deleted</div> :
          <div>
            <Post key={post.id} data={post} isLoading={loading} isDetails={true} />
            <p>Comments</p>
            {comments
              .filter(comment => comment.deleted !== true)
              .map(comment =>
                <Comment key={comment.id} data={comment} isLoading={loading} />
              )}
            {newComment}
            {newComment === null &&
            <Button onClick={() => this.props.addNewComment(post.id)}>
              Create comment
            </Button>
            }
          </div>
      )
    }

    return content
  }
}

const mapStateToProps = state => {
  return {
    postDetailsState: state.postDetails,
    commentsState: state.comments,
    commentCreateState: state.commentCreate
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