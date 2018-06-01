import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'

//region fetchPostComments

export const GET_POST_COMMENTS_SUCCESS = 'GET_POST_COMMENTS_SUCCESS'
export const GET_POST_COMMENTS_FAILED = 'GET_POST_COMMENTS_FAILED'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'

export const fetchPostComments = postId => dispatch => {

  dispatch(ActionUtils.loadingAction(GET_POST_COMMENTS))

  API.fetchPostComments(postId)
    .then(response => dispatch({
      type: GET_POST_COMMENTS_SUCCESS,
      postId,
      comments: response.data,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch(ActionUtils.failedAction(GET_POST_COMMENTS_FAILED, reason)))
}

//endregion

//region upVoteComment

export const UP_VOTE_COMMENT_SUCCESS = 'UP_VOTE_COMMENT_SUCCESS'
export const UP_VOTE_COMMENT_FAILED = 'UP_VOTE_COMMENT_FAILED'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'

export const upVoteComment = commentId => dispatch => {

  dispatch(ActionUtils.loadingAction(UP_VOTE_COMMENT))

  API.voteOnComment(commentId, 'upVote')
    .then(response => dispatch({
      type: UP_VOTE_COMMENT_SUCCESS,
      postId: response.data.parentId,
      commentId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch(ActionUtils.failedAction(UP_VOTE_COMMENT_FAILED, reason)))
}

//endregion

//region downVoteComment

export const DOWN_VOTE_COMMENT_SUCCESS = 'DOWN_VOTE_COMMENT_SUCCESS'
export const DOWN_VOTE_COMMENT_FAILED = 'DOWN_VOTE_COMMENT_FAILED'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

export const downVoteComment = commentId => dispatch => {

  dispatch(ActionUtils.loadingAction(DOWN_VOTE_COMMENT))

  API.voteOnComment(commentId, 'downVote')
    .then(response => dispatch({
      type: DOWN_VOTE_COMMENT_SUCCESS,
      postId: response.data.parentId,
      commentId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch(ActionUtils.failedAction(DOWN_VOTE_COMMENT_FAILED, reason)))
}

//endregion

//region deleteComment

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const deleteComment = commentId => dispatch => {

  dispatch(ActionUtils.loadingAction(DELETE_COMMENT))

  API.deleteComment(commentId)
    .then(response => dispatch({
      type: DELETE_COMMENT_SUCCESS,
      postId: response.data.parentId,
      commentId,
      ...ActionUtils.successState()
    }))
    .catch(reason => dispatch(ActionUtils.failedAction(DELETE_COMMENT_FAILED, reason)))
}

//endregion