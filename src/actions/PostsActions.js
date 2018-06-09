import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'
import { uuid } from '../utils/AppUtils'
import { fetchPostComments } from './CommentsActions'

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
    .then(response => {
      dispatch(postSuccessfulAction(GET_POST_DETAILS_SUCCESS, response.data))
      dispatch(fetchPostComments(response.data.id))
    })
    .catch(reason => dispatch(ActionUtils.failedAction(GET_POST_DETAILS_FAILED, reason)))
}

//endregion

//region votePost

export const VOTE_ON_POST_SUCCESS = 'VOTE_ON_POST_SUCCESS'
export const VOTE_ON_POST_FAILED = 'VOTE_ON_POST_FAILED'
export const VOTE_ON_POST = 'VOTE_ON_POST'

export const voteOnPost = (postId, voteType) => dispatch => {

  dispatch(ActionUtils.loadingAction(VOTE_ON_POST))

  API.voteOnPost(postId, voteType)
    .then(response => dispatch(postSuccessfulAction(VOTE_ON_POST_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(VOTE_ON_POST_FAILED, reason)))
}

//endregion

//region deletePost

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'
export const DELETE_POST = 'DELETE_POST'

export const deletePost = postId => dispatch => {

  dispatch(ActionUtils.loadingAction(DELETE_POST))

  API.deletePost(postId)
    .then(response => dispatch(postSuccessfulAction(DELETE_POST_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(DELETE_POST_FAILED, reason)))
}

//endregion

//region sortPosts

export const SORT_POSTS = 'SORT_POSTS'

export const sortPosts = ({sortBy, orderBy}) => {
  return {
    type: SORT_POSTS,
    sortBy,
    orderBy
  }
}

//endregion

//region updatePost

export const EDIT_POST = 'EDIT_POST'

export const editPost = post => {
  return {
    type: EDIT_POST,
    post,
  }
}

export const CANCEL_EDIT_POST = 'CANCEL_EDIT_POST'

export const cancelEditPost = () => {
  return {
    type: CANCEL_EDIT_POST
  }
}

export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED'
export const UPDATE_POST = 'UPDATE_POST'

export const updatePost = (postId, postTitle, postBody) => dispatch => {

  dispatch(ActionUtils.loadingAction(UPDATE_POST))

  API.updatePost(postId, postTitle, postBody)
    .then(response => dispatch(postSuccessfulAction(UPDATE_POST_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(UPDATE_POST_FAILED, reason)))
}

//endregion

//region createPost

export const ADD_NEW_POST = 'ADD_NEW_POST'

export const addNewPost = () => {
  return {
    type: ADD_NEW_POST,
    post: {
      id: uuid(),
    }
  }
}

export const addNewCategoryPost = category => {
  return {
    type: ADD_NEW_POST,
    post: {
      id: uuid(),
      category,
    }
  }
}

export const CANCEL_ADD_NEW_POST = 'CANCEL_ADD_NEW_POST'

export const cancelAddNewPost = () => {
  return {
    type: CANCEL_ADD_NEW_POST,
  }
}

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAILED = 'CREATE_POST_FAILED'
export const CREATE_POST = 'CREATE_POST'

export const createPost = (postId, postTitle, postBody, postAuthor, postCategory) => dispatch => {

  dispatch(ActionUtils.loadingAction(CREATE_POST))

  API.createPost(postId, postTitle, postBody, postAuthor, postCategory)
    .then(response => dispatch(postSuccessfulAction(CREATE_POST_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(CREATE_POST_FAILED, reason)))

}

//endregion