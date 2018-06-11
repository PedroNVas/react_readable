import * as CommentsActions from "../actions/CommentsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialCommentEditState = {
  comment: {},
  success: false,
  loading: false,
  failed: false
};

const commentEdit = (state = initialCommentEditState, action) => {

  const { payload } = action;

  switch (action.type) {

    //region pending actions

    case CommentsActions.FETCH_COMMENT_DETAILS_PENDING:
      return {
        ...state,
        comment: {},
        ...StoreUtils.loadingState()
      };

    case CommentsActions.UPDATE_COMMENT_PENDING:
      return {
        ...state,
        ...StoreUtils.loadingState()
      };

    //endregion

    //region fulfilled actions

    case CommentsActions.FETCH_COMMENT_DETAILS_FULFILLED:
      return {
        ...state,
        comment: payload.data,
        ...StoreUtils.successState()
      };

    case CommentsActions.CANCEL_EDIT_COMMENT:
      return {
        ...state,
        comment: {}
      };

    case CommentsActions.UPDATE_COMMENT_FULFILLED:
      return {
        ...state,
        comment: {},
        ...StoreUtils.successState()
      };

    //endregion

    //region rejected actions

    case CommentsActions.UPDATE_COMMENT_REJECTED:
    case CommentsActions.FETCH_COMMENT_DETAILS_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    default:
      return initialCommentEditState;
  }

};

export default commentEdit;