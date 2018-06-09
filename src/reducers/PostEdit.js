import * as PostActions from '../actions/PostsActions'

const initialPostEditState = {
  post: {},
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const postEdit = (state = initialPostEditState, action) => {

  const {post, loading, success, failed, failReason} = action

  switch (action.type) {

    case PostActions.EDIT_POST:
      return {
        ...state,
        post
      }

    //region loading actions

    case PostActions.UPDATE_POST:
      return {
        ...state,
        success,
        loading,
        failed
      }

    //endregion

    //region failed actions

    case PostActions.UPDATE_POST_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

    case PostActions.CANCEL_EDIT_POST:
    case PostActions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: {},
        success,
        loading,
        failed
      }

    //endregion

    default:
      return initialPostEditState
  }

}

export default postEdit