import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'

//region fetchPosts

export const ADD_ALL_POSTS_SUCCESS = 'ADD_ALL_POSTS_SUCCESS'
export const ADD_ALL_POSTS_FAILED = 'ADD_ALL_POSTS_FAILED'
export const ADD_ALL_POSTS = 'ADD_ALL_POSTS'

export const fetchPosts = () => dispatch => {

  dispatch({type: ADD_ALL_POSTS, ...ActionUtils.loadingAction()})

  API.fetchPosts()
    .then(response => dispatch({
      type: ADD_ALL_POSTS_SUCCESS,
      posts: response.data,
      ...ActionUtils.successAction()
    }))
    .catch(reason => dispatch({
      type: ADD_ALL_POSTS_FAILED,
      failReason: reason,
      ...ActionUtils.failedAction()
    }))
}

//endregion

//region fetchPostDetails

export const GET_POST_DETAILS_SUCCESS = 'GET_POST_DETAILS_SUCCESS'
export const GET_POST_DETAILS_FAILED = 'GET_POST_DETAILS_FAILED'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'

export const fetchPostDetails = postID => dispatch => {

  dispatch({type: GET_POST_DETAILS, ...ActionUtils.loadingAction()})

  API.fetchPostDetails(postID)
    .then(response => dispatch({
      type: GET_POST_DETAILS_SUCCESS,
      post: response.data,
      ...ActionUtils.successAction()
    }))
    .catch(reason => dispatch({
      type: GET_POST_DETAILS_FAILED,
      failedReason: reason,
      ...ActionUtils.failedAction()
    }))
}

//endregion

//region upVotePost

export const UP_VOTE_POST_SUCCESS = 'UP_VOTE_POST_SUCCESS'
export const UP_VOTE_POST_FAILED = 'UP_VOTE_POST_FAILED'
export const UP_VOTE_POST = 'UP_VOTE_POST'

export const upVotePost = postId => dispatch => {

  dispatch({type: UP_VOTE_POST, ...ActionUtils.loadingAction()})

  API.voteOnPost(postId, 'upVote')
    .then(response => dispatch({
      type: UP_VOTE_POST_SUCCESS,
      postId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successAction()
    }))
    .catch(reason => dispatch({
      type: UP_VOTE_POST_FAILED,
      failReason: reason,
      ...ActionUtils.failedAction()
    }))

}

//endregion

//region downVotePost

export const DOWN_VOTE_POST_SUCCESS = 'DOWN_VOTE_POST_SUCCESS'
export const DOWN_VOTE_POST_FAILED = 'DOWN_VOTE_POST_FAILED'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'

export const downVotePost = postId => dispatch => {

  dispatch({type: DOWN_VOTE_POST, ...ActionUtils.loadingAction()})

  API.voteOnPost(postId, 'downVote')
    .then(response => dispatch({
      type: DOWN_VOTE_POST_SUCCESS,
      postId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successAction()
    }))
    .catch(reason => dispatch({
      type: DOWN_VOTE_POST_FAILED,
      failReason: reason,
      ...ActionUtils.failedAction()
    }))
}

//endregion

//region deletePost

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'
export const DELETE_POST = 'DELETE_POST'

export const deletePost = postId => dispatch => {

  dispatch({type: DELETE_POST, ...ActionUtils.loadingAction()})

  API.deletePost(postId)
    .then(response => dispatch({
      type: DELETE_POST_SUCCESS,
      postId: response.data.id,
      ...ActionUtils.successAction()
    }))
    .catch(reason => dispatch({
      type: DELETE_POST_FAILED,
      failReason: reason,
      ...ActionUtils.failedAction()
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

