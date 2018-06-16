import * as CommentsActions from "../actions/CommentsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialCommentCreateState = {
  comment: {},
  success: false,
  loading: false,
  failed: false
};

const commentCreate = (state = initialCommentCreateState, action) => {
  const { comment } = action;

  switch (action.type) {
    //region pending actions

    case CommentsActions.ADD_NEW_COMMENT:
      return {
        ...state,
        comment
      };

    case CommentsActions.CREATE_COMMENT_PENDING:
      return {
        ...state,
        ...StoreUtils.loadingState()
      };

    //endregion

    //region fulfilled actions

    case CommentsActions.CANCEL_ADD_NEW_COMMENT:
      return {
        ...initialCommentCreateState
      };

    case CommentsActions.CREATE_COMMENT_FULFILLED:
      return {
        ...state,
        comment: {},
        ...StoreUtils.successState()
      };

    //endregion

    //region rejected actions

    case CommentsActions.CREATE_COMMENT_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    default:
      return initialCommentCreateState;
  }
};

export default commentCreate;
