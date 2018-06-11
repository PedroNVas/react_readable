import * as PostsActions from "../actions/PostsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialPostCreateState = {
  post: {},
  success: false,
  loading: false,
  failed: false
};

const postCreate = (state = initialPostCreateState, action) => {

  const { post } = action;

  switch (action.type) {

    //region pending actions

    case PostsActions.ADD_NEW_POST:
      return {
        ...state,
        post
      };

    case PostsActions.CREATE_POST_PENDING:
      return {
        ...state,
        ...StoreUtils.loadingState()
      };


    //endregion

    //region fulfilled actions

    case PostsActions.CREATE_POST_FULFILLED:
      return {
        ...state,
        post: {},
        ...StoreUtils.successState()
      };

    case PostsActions.CANCEL_ADD_NEW_POST:
      return {
        ...state,
        post: {}
      };

    //endregion

    //region rejected actions

    case PostsActions.CREATE_POST_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    default:
      return initialPostCreateState;
  }
};

export default postCreate;