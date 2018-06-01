import _ from 'underscore'
import * as PostsActions from '../actions/PostsActions'

const initialPostsState = {
  posts: [],
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const contains = (object, list) => {
  const found = _.find(list, item => _.isEqual(object, item))
  return !!(_.isObject(found))
}

const posts = (state = initialPostsState, action) => {

  const {posts, loading, success, failed, failReason} = action

  switch (action.type) {
    case PostsActions.GET_POSTS:
    case PostsActions.UP_VOTE_POST:
    case PostsActions.DOWN_VOTE_POST:
    case PostsActions.DELETE_POST:
    case PostsActions.GET_CATEGORY_POST:
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

    case PostsActions.GET_CATEGORY_POST_SUCCESS: {

      let newPosts = state.posts
      for (const post of posts) {
        if (!contains(post, state.posts)) {
          newPosts.push(post)
        }
      }

      return {
        ...state,
        posts: newPosts,
        success,
        loading,
        failed
      }
    }

    case PostsActions.GET_POSTS_FAILED:
    case PostsActions.UP_VOTE_POST_FAILED:
    case PostsActions.DOWN_VOTE_POST_FAILED:
    case PostsActions.DELETE_POST_FAILED:
    case PostsActions.GET_CATEGORY_POST_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    case PostsActions.UP_VOTE_POST_SUCCESS:
    case PostsActions.DOWN_VOTE_POST_SUCCESS: {
      const {postId, voteScore} = action

      return {
        ...state,
        posts: state.posts.map(
          post => post.id === postId ? {...post, voteScore} : post
        ),
        success,
        loading,
        failed,
      }
    }

    case PostsActions.DELETE_POST_SUCCESS: {
      const {postId} = action

      return {
        ...state,
        posts: state.posts.map(
          post => post.id === postId ? {...post, deleted: true} : post
        ),
        success,
        loading,
        failed,
      }
    }

    case PostsActions.SORT_POSTS: {
      const {sortBy, orderBy} = action

      let sortedPosts

      if (sortBy !== '') {
        sortedPosts = sortBy === '' ? state.posts : _.sortBy(state.posts, sortBy)
        sortedPosts = orderBy === 'desc' ? sortedPosts.reverse() : sortedPosts
      } else {
        sortedPosts = state.posts
      }

      return {
        ...state,
        posts: sortedPosts,
        success,
        loading,
        failed,
      }
    }

    default:
      return state

  }
}

export default posts