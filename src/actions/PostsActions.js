import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'

//region fetchPosts

export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS'
export const GET_ALL_POSTS_FAILED = 'GET_ALL_POSTS_FAILED'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'

export const fetchPosts = () => dispatch => {

  dispatch({type: GET_ALL_POSTS, ...ActionUtils.loadingState()})

  API.fetchPosts()
    .then(response => dispatch({
      type: GET_ALL_POSTS_SUCCESS,
      posts: response.data,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch({
      type: GET_ALL_POSTS_FAILED,
      failReason: reason,
      ...ActionUtils.failedState()
    }))
}

//endregion

//region fetchCategoryPosts

export const GET_CATEGORY_POST_SUCCESS = 'GET_CATEGORY_POST_SUCCESS'
export const GET_CATEGORY_POST_FAILED = 'GET_CATEGORY_POST_FAILED'
export const GET_CATEGORY_POST = 'GET_CATEGORY_POST'

export const fetchCategoryPosts = category => dispatch => {

  dispatch({type: GET_CATEGORY_POST, ...ActionUtils.loadingState()})

  API.fetchCategoryPosts(category)
    .then(response => dispatch({
      type: GET_CATEGORY_POST_SUCCESS,
      posts: response.data,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch({
      type: GET_CATEGORY_POST_FAILED,
      failReason: reason,
      ...ActionUtils.failedState()
    }))
}

//endregion

//region fetchPostDetails

export const GET_POST_DETAILS_SUCCESS = 'GET_POST_DETAILS_SUCCESS'
export const GET_POST_DETAILS_FAILED = 'GET_POST_DETAILS_FAILED'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'

export const fetchPostDetails = postID => dispatch => {

  dispatch({type: GET_POST_DETAILS, ...ActionUtils.loadingState()})

  API.fetchPostDetails(postID)
    .then(response => dispatch({
      type: GET_POST_DETAILS_SUCCESS,
      post: response.data,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch({
      type: GET_POST_DETAILS_FAILED,
      failedReason: reason,
      ...ActionUtils.failedState()
    }))
}

//endregion

//region upVotePost

export const UP_VOTE_POST_SUCCESS = 'UP_VOTE_POST_SUCCESS'
export const UP_VOTE_POST_FAILED = 'UP_VOTE_POST_FAILED'
export const UP_VOTE_POST = 'UP_VOTE_POST'

export const upVotePost = postId => dispatch => {

  dispatch({type: UP_VOTE_POST, ...ActionUtils.loadingState()})

  API.voteOnPost(postId, 'upVote')
    .then(response => dispatch({
      type: UP_VOTE_POST_SUCCESS,
      postId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch({
      type: UP_VOTE_POST_FAILED,
      failReason: reason,
      ...ActionUtils.failedState()
    }))
}

//endregion

//region downVotePost

export const DOWN_VOTE_POST_SUCCESS = 'DOWN_VOTE_POST_SUCCESS'
export const DOWN_VOTE_POST_FAILED = 'DOWN_VOTE_POST_FAILED'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'

export const downVotePost = postId => dispatch => {

  dispatch({type: DOWN_VOTE_POST, ...ActionUtils.loadingState()})

  API.voteOnPost(postId, 'downVote')
    .then(response => dispatch({
      type: DOWN_VOTE_POST_SUCCESS,
      postId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch({
      type: DOWN_VOTE_POST_FAILED,
      failReason: reason,
      ...ActionUtils.failedState()
    }))
}

//endregion

//region deletePost

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'
export const DELETE_POST = 'DELETE_POST'

export const deletePost = postId => dispatch => {

  dispatch({type: DELETE_POST, ...ActionUtils.loadingState()})

  API.deletePost(postId)
    .then(response => dispatch({
      type: DELETE_POST_SUCCESS,
      postId: response.data.id,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch({
      type: DELETE_POST_FAILED,
      failReason: reason,
      ...ActionUtils.failedState()
    }))
}

//endregion

//region sortPosts

export const SORT_POSTS = 'SORT_POSTS'

export const sortPost = ({sortBy, orderBy}) => {
  return {
    type: SORT_POSTS,
    sortBy,
    orderBy
  }
}

//endregion

