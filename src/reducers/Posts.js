import _ from "underscore";
import * as PostsActions from "../actions/PostsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialPostsState = {
  posts: [],
  success: false,
  loading: false,
  failed: false
};

const posts = (state = initialPostsState, action) => {

  const { payload } = action;

  switch (action.type) {

    //region pending actions

    case PostsActions.FETCH_POSTS_PENDING:
      return {
        ...state,
        posts: [],
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

    case PostsActions.FETCH_POSTS_FULFILLED:
      return {
        ...state,
        posts: payload.data,
        ...StoreUtils.successState()
      };

    case PostsActions.UPDATE_POST_FULFILLED:
    case PostsActions.DELETE_POST_FULFILLED:
    case PostsActions.VOTE_ON_POST_FULFILLED:
      return {
        ...state,
        posts: state.posts.map(oldPost => oldPost.id === payload.data.id ? payload.data : oldPost),
        ...StoreUtils.successState()
      };

    case PostsActions.CREATE_POST_FULFILLED:
      return {
        ...state,
        posts: state.posts.concat(payload.data)
      };

    case PostsActions.SORT_POSTS: {
      const { sortBy, orderBy } = action;

      let sortedPosts = _.sortBy(state.posts, sortBy);
      sortedPosts = orderBy === "desc" ? sortedPosts.reverse() : sortedPosts;

      return {
        ...state,
        posts: sortedPosts
      };
    }

    //endregion

    //region rejected actions

    case PostsActions.DELETE_POST_REJECTED:
    case PostsActions.VOTE_ON_POST_REJECTED:
    case PostsActions.FETCH_POSTS_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    default:
      return state;

  }
};

export default posts;