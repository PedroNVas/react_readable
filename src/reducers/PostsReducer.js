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

    //region loading actions

    case PostsActions.GET_POSTS:
    case PostsActions.VOTE_ON_POST:
    case PostsActions.DELETE_POST:
    case PostsActions.GET_CATEGORY_POST:
    case PostsActions.UPDATE_POST:
    case PostsActions.CREATE_POST:
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
    case PostsActions.GET_CATEGORY_POST_FAILED:
    case PostsActions.UPDATE_POST_FAILED:
    case PostsActions.CREATE_POST_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

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

    case PostsActions.VOTE_ON_POST_SUCCESS:
    case PostsActions.DELETE_POST_SUCCESS:
    case PostsActions.UPDATE_POST_SUCCESS: {

      const {post} = action

      return {
        ...state,
        posts: state.posts.map(
          oldPost => oldPost.id === post.id ? post : oldPost
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

    case PostsActions.EDIT_POST:
    case PostsActions.CANCEL_EDIT_POST: {
      const {postId, editMode} = action

      return {
        ...state,
        posts: state.posts.map(oldPost => oldPost.id === postId ? {...oldPost, editMode} : oldPost)
      }
    }

    case PostsActions.ADD_NEW_POST: {

      const {id, createMode, category} = action

      let newPost
      if (category !== undefined) {
        newPost = {id, createMode, category}
      } else {
        newPost = {id, createMode}
      }

      return {
        ...state,
        posts: state.posts.concat(newPost)
      }
    }

    case PostsActions.CREATE_POST_SUCCESS: {
      const {post} = action

      return {
        ...state,
        posts: state.posts.map(oldPost => oldPost.id === post.id ? post : oldPost),
        success,
        loading,
        failed
      }
    }

    case PostsActions.CANCEL_ADD_NEW_POST: {
      const {postId} = action

      return {
        ...state,
        posts: state.posts.filter(post => post.id !== postId)
      }
    }

    //endregion

    default:
      return state

  }
}

export default posts