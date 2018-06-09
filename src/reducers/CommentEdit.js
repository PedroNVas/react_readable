import * as CommentsActions from '../actions/CommentsActions'

const initialCommentEditState = {
  comment: {},
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const commentEdit = (state = initialCommentEditState, action) => {

  const {comment, loading, success, failed, failReason} = action

  switch (action.type) {

    //region loading actions

    case CommentsActions.UPDATE_COMMENT:
    case CommentsActions.GET_COMMENT_DETAILS:
      return {
        ...state,
        success,
        loading,
        failed
      }

    //endregion

    //region failed actions

    case CommentsActions.UPDATE_COMMENT_FAILED:
    case CommentsActions.GET_COMMENT_DETAILS_FAILED:
      return {
        ...state,
        loading,
        success,
        failed,
        failReason
      }

    //endregion

    //region success actions

    case CommentsActions.GET_COMMENT_DETAILS_SUCCESS:
      return {
        ...state,
        comment,
        loading,
        success,
        failed,
      }

    case CommentsActions.UPDATE_COMMENT_SUCCESS:
    case CommentsActions.CANCEL_EDIT_COMMENT:
      return {
        ...state,
        comment: {},
        loading,
        success,
        failed,
      }

    //endregion

    default:
      return initialCommentEditState
  }

}

export default commentEdit