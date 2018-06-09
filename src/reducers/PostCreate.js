import * as PostsActions from '../actions/PostsActions'

const initialPostCreateState = {
  post: {},
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const postCreate = (state = initialPostCreateState, action) => {

  const {post, loading, success, failed, failReason} = action

  switch (action.type) {

    //region loading actions

    case PostsActions.CREATE_POST:
      return {
        ...state,
        success,
        loading,
        failed
      }

    case PostsActions.ADD_NEW_POST:
      return {
        ...state,
        post
      }

    //endregion

    //region failed actions

    case PostsActions.CREATE_POST_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

    //endregion

    case PostsActions.CREATE_POST_SUCCESS:
    case PostsActions.CANCEL_ADD_NEW_POST:
      return {
        ...state,
        post: {},
        success,
        loading,
        failed
      }

    default:
      return initialPostCreateState
  }
}

export default postCreate