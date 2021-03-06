import _ from "underscore";
import * as PostsActions from "../actions/PostsActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialCategoryPostsState = {
  posts: [],
  success: false,
  loading: false,
  failed: false
};

const categoryPosts = (state = initialCategoryPostsState, action) => {
  const { payload } = action;

  switch (action.type) {
    //region pending actions

    case PostsActions.FETCH_CATEGORY_POST_PENDING:
      return {
        ...state,
        posts: [],
        ...StoreUtils.loadingState()
      };

    case PostsActions.DELETE_POST_PENDING:
    case PostsActions.VOTE_ON_POST_PENDING: {
      const { postId } = action.meta;

      return {
        ...state,
        posts: state.posts.map(
          oldPost =>
            oldPost.id === postId ? { ...oldPost, loading: true } : oldPost
        ),
        ...StoreUtils.loadingState()
      };
    }

    //endregion

    //region fulfilled actions

    case PostsActions.FETCH_CATEGORY_POST_FULFILLED:
      return {
        ...state,
        posts: action.payload.data,
        ...StoreUtils.successState()
      };

    case PostsActions.UPDATE_POST_FULFILLED:
    case PostsActions.DELETE_POST_FULFILLED:
    case PostsActions.VOTE_ON_POST_FULFILLED:
      return {
        ...state,
        posts: state.posts.map(
          oldPost => (oldPost.id === payload.data.id ? payload.data : oldPost)
        ),
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

    case PostsActions.FETCH_CATEGORY_POST_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    case PostsActions.DELETE_POST_REJECTED:
    case PostsActions.VOTE_ON_POST_REJECTED: {
      const { postId } = action.meta;

      return {
        ...state,
        posts: state.posts.map(
          oldPost =>
            oldPost.id === postId ? { ...oldPost, failed: true } : oldPost
        ),
        ...StoreUtils.failedState()
      };
    }
    //endregion

    default:
      return state;
  }
};

export default categoryPosts;
