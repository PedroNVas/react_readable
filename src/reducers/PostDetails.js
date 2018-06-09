import * as PostsActions from '../actions/PostsActions'

const initialPostDetailsState = {
  post: {},
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const postDetails = (state = initialPostDetailsState, action) => {

  const {post, loading, success, failed, failReason} = action

  switch (action.type) {

    // region loading actions

    case PostsActions.GET_POST_DETAILS:
    case PostsActions.DELETE_POST:
    case PostsActions.VOTE_ON_POST:
      return {
        ...state,
        success,
        loading,
        failed
      }

    //endregion

    //region failed actions

    case PostsActions.GET_POST_DETAILS_FAILED:
    case PostsActions.DELETE_POST_FAILED:
    case PostsActions.VOTE_ON_POST_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

    case PostsActions.GET_POST_DETAILS_SUCCESS:
    case PostsActions.DELETE_POST_SUCCESS:
    case PostsActions.VOTE_ON_POST_SUCCESS:
    case PostsActions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        post,
        success,
        loading,
        failed
      }

    //endregion

    default:
      return state
  }
}

export default postDetails