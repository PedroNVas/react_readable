import * as CommentsActions from "../actions/CommentsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialCommentsState = {
  comments: [],
  success: false,
  loading: false,
  failed: false,
  failReason: ""
};

const comments = (state = initialCommentsState, action) => {

  const { comments, loading, success, failed, failReason, payload } = action;

  switch (action.type) {


    //region pending actions

    case CommentsActions.DELETE_COMMENT_PENDING:
    case CommentsActions.VOTE_ON_COMMENT_PENDING:
      return {
        ...state,
        ...StoreUtils.loadingState()
      };

    //endregion

    //region fulfilled actions

    case CommentsActions.UPDATE_COMMENT_FULFILLED:
    case CommentsActions.VOTE_ON_COMMENT_FULFILLED:
      return {
        ...state,
        comments: state.comments.map(oldComment => oldComment.id === payload.data.id ? payload.data : oldComment),
        ...StoreUtils.successState()
      };

    case CommentsActions.DELETE_COMMENT_FULFILLED: {

      return {
        ...state,
        comments: state.comments.filter(oldComment => oldComment.id !== payload.data.id),
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

    case CommentsActions.DELETE_COMMENT_REJECTED:
    case CommentsActions.VOTE_ON_COMMENT_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    //region loading actions

    case CommentsActions.GET_POST_COMMENTS:
      return {
        ...state,
        success,
        loading,
        failed
      };

    //endregion

    //region failed actions

    case CommentsActions.GET_POST_COMMENTS_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      };

    //endregion

    //region success actions

    case CommentsActions.GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments,
        success,
        loading,
        failed
      };

    //endregion

    default:
      return state;
  }

};

export default comments;

