import * as CommentsActions from "../actions/CommentsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialCommentsState = {
  comments: [],
  success: false,
  loading: false,
  failed: false
};

const comments = (state = initialCommentsState, action) => {
  const { payload } = action;

  switch (action.type) {
    //region pending actions

    case CommentsActions.GET_POST_COMMENTS_PENDING:
      return {
        ...state,
        comments: [],
        ...StoreUtils.loadingState()
      };

    case CommentsActions.DELETE_COMMENT_PENDING:
    case CommentsActions.VOTE_ON_COMMENT_PENDING: {
      const { commentId } = action.meta;

      return {
        ...state,
        comments: state.comments.map(
          oldComment =>
            oldComment.id === commentId
              ? { ...oldComment, loading: true }
              : oldComment
        ),
        ...StoreUtils.loadingState()
      };
    }
    //endregion

    //region fulfilled actions

    case CommentsActions.GET_POST_COMMENTS_FULFILLED:
      return {
        ...state,
        comments: payload.data,
        ...StoreUtils.successState()
      };

    case CommentsActions.UPDATE_COMMENT_FULFILLED:
    case CommentsActions.VOTE_ON_COMMENT_FULFILLED:
      return {
        ...state,
        comments: state.comments.map(
          oldComment =>
            oldComment.id === payload.data.id ? payload.data : oldComment
        ),
        ...StoreUtils.successState()
      };

    case CommentsActions.DELETE_COMMENT_FULFILLED: {
      return {
        ...state,
        comments: state.comments.filter(
          oldComment => oldComment.id !== payload.data.id
        ),
        ...StoreUtils.successState()
      };
    }

    case CommentsActions.CREATE_COMMENT_FULFILLED:
      return {
        ...state,
        comments: state.comments.concat(payload.data),
        ...StoreUtils.successState()
      };

    //endregion

    //region rejected actions

    case CommentsActions.GET_POST_COMMENTS_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    case CommentsActions.DELETE_COMMENT_REJECTED:
    case CommentsActions.VOTE_ON_COMMENT_REJECTED: {
      const { commentId } = action.meta;

      return {
        ...state,
        comments: state.comments.map(
          oldComment =>
            oldComment.id === commentId
              ? { ...oldComment, failed: true }
              : oldComment
        ),
        ...StoreUtils.failedState()
      };
    }

    //endregion

    default:
      return state;
  }
};

export default comments;
