import * as PostsActions from "../actions/PostsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialPostEditState = {
  post: {},
  success: false,
  loading: false,
  failed: false
};

const postEdit = (state = initialPostEditState, action) => {

  const { post } = action;

  switch (action.type) {

    //region pending actions

    case PostsActions.EDIT_POST:
      return {
        ...state,
        post
      };

    case PostsActions.UPDATE_POST_PENDING:
      return {
        ...state,
        ...StoreUtils.loadingState()
      };

    //endregion

    //region fulfilled actions

    case PostsActions.UPDATE_POST_FULFILLED:
      return {
        ...state,
        post: {},
        ...StoreUtils.successState()
      };

    case PostsActions.CANCEL_EDIT_POST:
      return {
        ...state,
        post: {}
      };

    //endregion

    //region rejected actions

    case PostsActions.UPDATE_POST_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    default:
      return initialPostEditState;
  }

};

export default postEdit;