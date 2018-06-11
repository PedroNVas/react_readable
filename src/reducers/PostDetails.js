import * as PostsActions from "../actions/PostsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialPostDetailsState = {
  post: {},
  success: false,
  loading: false,
  failed: false
};

const postDetails = (state = initialPostDetailsState, action) => {

  const { payload } = action;

  switch (action.type) {

    //region pending actions

    case PostsActions.FETCH_POST_DETAILS_PENDING:
      return {
        ...state,
        post: {},
        ...StoreUtils.loadingState()
      };

    case PostsActions.DELETE_POST_PENDING:
    case PostsActions.VOTE_ON_POST_PENDING:
      return {
        ...state,
        ...StoreUtils.loadingState()
      };

    //endregion

    //region fulfilled actions

    case PostsActions.UPDATE_POST_FULFILLED:
    case PostsActions.DELETE_POST_FULFILLED:
    case PostsActions.VOTE_ON_POST_FULFILLED:
    case PostsActions.FETCH_POST_DETAILS_FULFILLED:
      return {
        ...state,
        post: payload.data,
        ...StoreUtils.successState()
      };

    //endregion

    //region rejected actions

    case PostsActions.DELETE_POST_REJECTED:
    case PostsActions.VOTE_ON_POST_REJECTED:
    case PostsActions.FETCH_POST_DETAILS_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    default:
      return state;
  }
};

export default postDetails;