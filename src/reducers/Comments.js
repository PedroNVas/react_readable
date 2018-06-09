import * as CommentsActions from '../actions/CommentsActions'

const initialCommentsState = {
  comments: [],
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const comments = (state = initialCommentsState, action) => {

  const {comments, loading, success, failed, failReason} = action

  switch (action.type) {

    //region loading actions

    case CommentsActions.GET_POST_COMMENTS:
    case CommentsActions.VOTE_ON_COMMENT:
    case CommentsActions.DELETE_COMMENT:
      return {
        ...state,
        success,
        loading,
        failed
      }

    //endregion

    //region failed actions

    case CommentsActions.VOTE_ON_COMMENT_FAILED:
    case CommentsActions.GET_POST_COMMENTS_FAILED:
    case CommentsActions.DELETE_COMMENT_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

    case CommentsActions.GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments,
        success,
        loading,
        failed
      }

    case CommentsActions.UPDATE_COMMENT_SUCCESS:
    case CommentsActions.VOTE_ON_COMMENT_SUCCESS: {
      const {comment} = action

      return {
        ...state,
        comments: state.comments.map(
          oldComment => oldComment.id === comment.id ? comment : oldComment
        ),
        success,
        loading,
        failed
      }
    }

    case CommentsActions.CREATE_COMMENT_SUCCESS: {
      const {comment} = action

      return {
        ...state,
        comments: state.comments.concat(comment),
        success,
        loading,
        failed
      }
    }

    case CommentsActions.DELETE_COMMENT_SUCCESS: {
      const {comment} = action

      return {
        ...state,
        comments: state.comments.filter(oldComment => oldComment.id !== comment.id),
        success,
        loading,
        failed
      }
    }

    //endregion

    default:
      return state
  }

}

export default comments

