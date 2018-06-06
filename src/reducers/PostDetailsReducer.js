import * as CommentsActions from '../actions/CommentsActions'
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

    // region loading actions

    case PostsActions.GET_POST_DETAILS:
    case PostsActions.DELETE_POST:
    case PostsActions.VOTE_ON_POST:
    case PostsActions.UPDATE_POST:
    case CommentsActions.GET_POST_COMMENTS:
    case CommentsActions.DELETE_COMMENT:
    case CommentsActions.VOTE_ON_COMMENT:
    case CommentsActions.UPDATE_COMMENT:
    case CommentsActions.CREATE_COMMENT:
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
    case PostsActions.UPDATE_POST_FAILED:
    case CommentsActions.GET_POST_COMMENTS_FAILED:
    case CommentsActions.DELETE_COMMENT_FAILED:
    case CommentsActions.VOTE_ON_COMMENT_FAILED:
    case CommentsActions.UPDATE_COMMENT_FAILED:
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

    case CommentsActions.GET_POST_COMMENTS_SUCCESS: {

      const {comments} = action

      return {
        ...state,
        comments,
        success,
        loading,
        failed
      }
    }
    case CommentsActions.VOTE_ON_COMMENT_SUCCESS:
    case CommentsActions.DELETE_COMMENT_SUCCESS:
    case CommentsActions.UPDATE_COMMENT_SUCCESS: {

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

    case PostsActions.EDIT_POST:
    case PostsActions.CANCEL_EDIT_POST: {
      const {editMode} = action

      return {
        ...state,
        post: {
          ...state.post,
          editMode,
        }
      }
    }

    case CommentsActions.EDIT_COMMENT:
    case CommentsActions.CANCEL_EDIT_COMMENT: {
      const {commentId, editMode} = action

      return {
        ...state,
        comments: state.comments.map(oldComment => oldComment.id === commentId ? {
          ...oldComment,
          editMode
        } : oldComment)
      }
    }

    case CommentsActions.ADD_NEW_COMMENT: {

      const {id, parentId, createMode} = action

      return {
        ...state,
        comments: state.comments.concat({id, createMode, parentId})
      }
    }

    case CommentsActions.CANCEL_ADD_NEW_COMMENT: {
      const {commentId} = action

      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      }
    }

    case CommentsActions.CREATE_COMMENT_SUCCESS: {
      const {comment} = action

      return {
        ...state,
        comments: state.comments.map(oldComment => oldComment.id === comment.id ? comment : oldComment),
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

export default postDetails