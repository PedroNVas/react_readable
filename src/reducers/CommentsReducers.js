import * as CommentsActions from '../actions/CommentsActions'

const initialCommentsState = {
  comments: new Map(),
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const updateCommentVoteScore = (postId, commentId, updatedVoteScore, state) => {

  const oldComments = state.comments.get(postId)
  return oldComments.map(comment => comment.id === commentId ? {
    ...comment,
    voteScore: updatedVoteScore
  } : comment)
}

const deleteComment = (postId, commentId, state) => {

  const oldComments = state.comments.get(postId)
  return oldComments.map(comment => comment.id === commentId ? {
    ...comment,
    deleted: true
  } : comment)
}

const comments = (state = initialCommentsState, action) => {

  const {comments, postId, loading, success, failed, failReason} = action

  const {commentId, voteScore} = action

  switch (action.type) {
    case CommentsActions.GET_POST_COMMENTS:
    case CommentsActions.UP_VOTE_COMMENT:
    case CommentsActions.DOWN_VOTE_COMMENT:
    case CommentsActions.DELETE_COMMENT:
      return {
        ...state,
        success,
        loading,
        failed
      }

    case CommentsActions.GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: new Map(state.comments).set(postId, comments),
        success,
        loading,
        failed
      }

    case CommentsActions.GET_POST_COMMENTS_FAILED:
    case CommentsActions.UP_VOTE_COMMENT_FAILED:
    case CommentsActions.DOWN_VOTE_COMMENT_FAILED:
    case CommentsActions.DELETE_COMMENT_FAILED: {
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }
    }

    case CommentsActions.UP_VOTE_COMMENT_SUCCESS:
    case CommentsActions.DOWN_VOTE_COMMENT_SUCCESS: {

      const newComments = updateCommentVoteScore(postId, commentId, voteScore, state)

      return {
        ...state,
        comments: new Map(state.comments).set(postId, newComments),
        success,
        loading,
        failed
      }
    }

    case CommentsActions.DELETE_COMMENT_SUCCESS: {

      const newComments = deleteComment(postId, commentId, state)

      return {
        ...state,
        comments: new Map(state.comments).set(postId, newComments),
        success,
        loading,
        failed
      }
    }

    default:
      return state
  }

}

export default comments