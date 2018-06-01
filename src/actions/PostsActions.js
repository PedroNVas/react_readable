import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'

//region posts action creator helper

const postsSuccessfulAction = (type, posts) => {
  return {
    type,
    posts,
    ...ActionUtils.successState()
  }
}

const postSuccessfulAction = (type, post) => {
  return {
    type,
    post,
    ...ActionUtils.successState()
  }
}

//endregion

//region fetchPosts

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED'
export const GET_POSTS = 'GET_POSTS'

export const fetchPosts = () => dispatch => {

  dispatch(ActionUtils.loadingAction(GET_POSTS))

  API.fetchPosts()
    .then(response => dispatch(postsSuccessfulAction(GET_POSTS_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(GET_POSTS_FAILED, reason)))
}

//endregion

//region fetchCategoryPosts

export const GET_CATEGORY_POST_SUCCESS = 'GET_CATEGORY_POST_SUCCESS'
export const GET_CATEGORY_POST_FAILED = 'GET_CATEGORY_POST_FAILED'
export const GET_CATEGORY_POST = 'GET_CATEGORY_POST'

export const fetchCategoryPosts = category => dispatch => {

  dispatch(ActionUtils.loadingAction(GET_CATEGORY_POST))

  API.fetchCategoryPosts(category)
    .then(response => dispatch(postsSuccessfulAction(GET_CATEGORY_POST_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(GET_CATEGORY_POST_FAILED, reason)))
}

//endregion

//region fetchPostDetails

export const GET_POST_DETAILS_SUCCESS = 'GET_POST_DETAILS_SUCCESS'
export const GET_POST_DETAILS_FAILED = 'GET_POST_DETAILS_FAILED'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'

export const fetchPostDetails = postID => dispatch => {

  dispatch(ActionUtils.loadingAction(GET_POST_DETAILS))

  API.fetchPostDetails(postID)
    .then(response => dispatch(postSuccessfulAction(GET_POST_DETAILS_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(GET_POST_DETAILS_FAILED, reason)))
}

//endregion

//region upVotePost

export const UP_VOTE_POST_SUCCESS = 'UP_VOTE_POST_SUCCESS'
export const UP_VOTE_POST_FAILED = 'UP_VOTE_POST_FAILED'
export const UP_VOTE_POST = 'UP_VOTE_POST'

export const upVotePost = postId => dispatch => {

  dispatch(ActionUtils.loadingAction(UP_VOTE_POST))

  API.voteOnPost(postId, 'upVote')
    .then(response => dispatch({
      type: UP_VOTE_POST_SUCCESS,
      postId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch(ActionUtils.failedAction(UP_VOTE_POST_FAILED, reason)))
}

//endregion

//region downVotePost

export const DOWN_VOTE_POST_SUCCESS = 'DOWN_VOTE_POST_SUCCESS'
export const DOWN_VOTE_POST_FAILED = 'DOWN_VOTE_POST_FAILED'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'

export const downVotePost = postId => dispatch => {

  dispatch(ActionUtils.loadingAction(DOWN_VOTE_POST))

  API.voteOnPost(postId, 'downVote')
    .then(response => dispatch({
      type: DOWN_VOTE_POST_SUCCESS,
      postId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch(ActionUtils.failedAction(UP_VOTE_POST_FAILED, reason)))
}

//endregion

//region deletePost

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'
export const DELETE_POST = 'DELETE_POST'

export const deletePost = postId => dispatch => {

  dispatch(ActionUtils.loadingAction(DELETE_POST))

  API.deletePost(postId)
    .then(response => dispatch({
      type: DELETE_POST_SUCCESS,
      postId: response.data.id,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch(ActionUtils.failedAction(UP_VOTE_POST_FAILED, reason)))
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