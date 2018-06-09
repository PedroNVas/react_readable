import * as CommentsActions from '../actions/CommentsActions'

const initialCommentCreateState = {
  comment: {},
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const commentCreate = (state = initialCommentCreateState, action) => {

  const {comment, loading, success, failed, failReason} = action

  switch (action.type) {

    //region loading actions

    case CommentsActions.CREATE_COMMENT:
      return {
        ...state,
        success,
        loading,
        failed
      }

    case CommentsActions.ADD_NEW_COMMENT:
      return {
        ...state,
        comment
      }

    //endregion

    //region failed actions

    case CommentsActions.CREATE_COMMENT_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

    case CommentsActions.CREATE_COMMENT_SUCCESS:
    case CommentsActions.CANCEL_ADD_NEW_COMMENT: {
      return {
        ...state,
        comment: {},
        success,
        loading,
        failed
      }
    }

    //endregion

    default:
      return initialCommentCreateState
  }
}

export default commentCreate