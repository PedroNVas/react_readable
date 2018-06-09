import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'
import { uuid } from '../utils/AppUtils'

//region comments action creator helper

const commentsSuccessfulAction = (type, comments) => {
  return {
    type,
    comments,
    ...ActionUtils.successState()
  }
}

const commentSuccessfulAction = (type, comment) => {
  return {
    type,
    comment,
    ...ActionUtils.successState()
  }
}

//endregion

//region fetchPostComments

export const GET_POST_COMMENTS_SUCCESS = 'GET_POST_COMMENTS_SUCCESS'
export const GET_POST_COMMENTS_FAILED = 'GET_POST_COMMENTS_FAILED'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'

export const fetchPostComments = postId => dispatch => {

  dispatch(ActionUtils.loadingAction(GET_POST_COMMENTS))

  API.fetchPostComments(postId)
    .then(response => dispatch(commentsSuccessfulAction(GET_POST_COMMENTS_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(GET_POST_COMMENTS_FAILED, reason)))
}

//endregion

//region voteOnComment

export const VOTE_ON_COMMENT_SUCCESS = 'VOTE_ON_COMMENT_SUCCESS'
export const VOTE_ON_COMMENT_FAILED = 'VOTE_ON_COMMENT_FAILED'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'

export const voteOnComment = (commentId, voteType) => dispatch => {

  dispatch(ActionUtils.loadingAction(VOTE_ON_COMMENT))

  API.voteOnComment(commentId, voteType)
    .then(response => dispatch(commentSuccessfulAction(VOTE_ON_COMMENT_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(VOTE_ON_COMMENT_FAILED, reason)))
}

//endregion

//region deleteComment

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const deleteComment = commentId => dispatch => {

  dispatch(ActionUtils.loadingAction(DELETE_COMMENT))

  API.deleteComment(commentId)
    .then(response => dispatch(commentSuccessfulAction(DELETE_COMMENT_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(DELETE_COMMENT_FAILED, reason)))
}

//endregion

//region fetchCommentDetails

export const GET_COMMENT_DETAILS_SUCCESS = 'GET_COMMENT_DETAILS_SUCCESS'
export const GET_COMMENT_DETAILS_FAILED = 'GET_COMMENT_DETAILS_FAILED'
export const GET_COMMENT_DETAILS = 'GET_COMMENT_DETAILS'

export const fetchCommentDetails = commentId => dispatch => {

  dispatch(ActionUtils.loadingAction(GET_COMMENT_DETAILS))

  API.fetchCommentDetails(commentId)
    .then(response => dispatch(commentSuccessfulAction(GET_COMMENT_DETAILS_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(GET_COMMENT_DETAILS_FAILED, reason)))
}

//endregion

//region cancelEditComment

export const CANCEL_EDIT_COMMENT = 'CANCEL_EDIT_COMMENT'

export const cancelEditComment = () => {

  return {
    type: CANCEL_EDIT_COMMENT
  }
}

//endregion

//region updateComment

export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS'
export const UPDATE_COMMENT_FAILED = 'UPDATE_COMMENT_FAILED'
export const UPDATE_COMMENT = 'UPDATE_FAILED'

export const updateComment = (commentId, commentBody) => dispatch => {

  dispatch(ActionUtils.loadingAction(UPDATE_COMMENT))

  API.updateComment(commentId, commentBody)
    .then(response => dispatch(commentSuccessfulAction(UPDATE_COMMENT_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(UPDATE_COMMENT_FAILED, reason)))
}

//endregion

//region createComment

export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'

export const addNewComment = postId => {
  return {
    type: ADD_NEW_COMMENT,
    comment: {
      id: uuid(),
      parentId: postId,
    }
  }
}

export const CANCEL_ADD_NEW_COMMENT = 'CANCEL_ADD_NEW_COMMENT'

export const cancelAddNewComment = () => {
  return {
    type: CANCEL_ADD_NEW_COMMENT
  }
}

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
export const CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export const createComment = (commentId, commentBody, commentAuthor, postId) => dispatch => {

  dispatch(ActionUtils.loadingAction(CREATE_COMMENT))

  API.createComment(commentId, commentBody, commentAuthor, postId)
    .then(response => dispatch(commentSuccessfulAction(CREATE_COMMENT_SUCCESS, response.data)))
    .catch(reason => dispatch(ActionUtils.failedAction(CREATE_COMMENT_FAILED, reason)))

}

//endregion