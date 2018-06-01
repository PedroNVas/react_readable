import * as PostsActions from '../actions/PostsActions'

const initialPostDetailsState = {
  post: {},
  comments: [],
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const postDetails = (state = initialPostDetailsState, action) => {

  const {post, loading, success, failed, failReason} = action

  switch (action.type) {

    case PostsActions.GET_POST_DETAILS:
    case PostsActions.DELETE_POST:
      return {
        ...state,
        success,
        loading,
        failed
      }

    case PostsActions.GET_POST_DETAILS_SUCCESS:
      return {
        ...state,
        post,
        success,
        loading,
        failed
      }

    case PostsActions.DELETE_POST_SUCCESS: {
      return {
        ...state,
        post: {
          ...post,
          deleted: true
        },
        success,
        loading,
        failed,
      }
    }

    case PostsActions.GET_POST_DETAILS_FAILED:
    case PostsActions.DELETE_POST_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    default:
      return state
  }
}

export default postDetails