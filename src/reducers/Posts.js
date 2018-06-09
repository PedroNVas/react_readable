import _ from 'underscore'
import * as PostsActions from '../actions/PostsActions'

const initialPostsState = {
  posts: [],
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}


const posts = (state = initialPostsState, action) => {

  const {posts, loading, success, failed, failReason} = action

  switch (action.type) {

    //region loading actions

    case PostsActions.GET_POSTS:
    case PostsActions.VOTE_ON_POST:
    case PostsActions.DELETE_POST:
      return {
        ...state,
        success,
        loading,
        failed
      }

    case PostsActions.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts,
        success,
        loading,
        failed
      }

    //endregion

    //region failed actions

    case PostsActions.GET_POSTS_FAILED:
    case PostsActions.VOTE_ON_POST_FAILED:
    case PostsActions.DELETE_POST_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

    case PostsActions.VOTE_ON_POST_SUCCESS:
    case PostsActions.DELETE_POST_SUCCESS:
    case PostsActions.UPDATE_POST_SUCCESS: {

      const {post} = action

      return {
        ...state,
        posts: state.posts.map(oldPost => oldPost.id === post.id ? post : oldPost
        ),
        success,
        loading,
        failed,
      }
    }

    case PostsActions.SORT_POSTS: {
      const {sortBy, orderBy} = action

      let sortedPosts = _.sortBy(state.posts, sortBy)
      sortedPosts = orderBy === 'desc' ? sortedPosts.reverse() : sortedPosts

      return {
        ...state,
        posts: sortedPosts,
        success,
        loading,
        failed,
      }
    }

    case PostsActions.CREATE_POST_SUCCESS: {
      const {post} = action

      return {
        ...state,
        posts: state.posts.concat(post),
        success,
        loading,
        failed,
      }
    }

    //endregion

    default:
      return state

  }
}

export default posts