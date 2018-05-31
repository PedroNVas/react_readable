import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'

//region fetchComments

export const ADD_ALL_COMMENTS_SUCCESS = 'ADD_ALL_COMMENTS_SUCCESS'
export const ADD_ALL_COMMENTS_FAILED = 'ADD_ALL_COMMENTS_FAILED'
export const ADD_ALL_COMMENTS = 'ADD_ALL_COMMENTS'

export const fetchComments = postId => dispatch => {

  dispatch({type: ADD_ALL_COMMENTS, ...ActionUtils.loadingAction()})

  API.fetchPostComments(postId)
    .then(response => dispatch({
        type: ADD_ALL_COMMENTS_SUCCESS,
        postId,
        comments: response.data,
        ...ActionUtils.successAction()
      })
    )
    .catch(reason => dispatch({
      type: ADD_ALL_COMMENTS_FAILED,
      failReason: reason,
      ...ActionUtils.failedAction()
    }))
}

//endregion

//region upVoteComment

export const UP_VOTE_COMMENT_SUCCESS = 'UP_VOTE_COMMENT_SUCCESS'
export const UP_VOTE_COMMENT_FAILED = 'UP_VOTE_COMMENT_FAILED'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'

export const upVoteComment = commentId => dispatch => {

  dispatch({type: UP_VOTE_COMMENT, ...ActionUtils.loadingAction()})

  API.voteOnComment(commentId, 'upVote')
    .then(response => dispatch({
        type: UP_VOTE_COMMENT_SUCCESS,
        postId: response.data.parentId,
        commentId,
        voteScore: response.data.voteScore,
        ...ActionUtils.successAction()
      })
    )
    .catch(reason => dispatch({
      type: UP_VOTE_COMMENT_FAILED,
      failReason: reason,
      ...ActionUtils.failedAction()
    }))

}

//endregion

//region downVoteComment

export const DOWN_VOTE_COMMENT_SUCCESS = 'DOWN_VOTE_COMMENT_SUCCESS'
export const DOWN_VOTE_COMMENT_FAILED = 'DOWN_VOTE_COMMENT_FAILED'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

export const downVoteComment = commentId => dispatch => {

  dispatch({type: DOWN_VOTE_COMMENT, ...ActionUtils.loadingAction()})

  API.voteOnComment(commentId, 'downVote')
    .then(response => dispatch({
      type: DOWN_VOTE_COMMENT_SUCCESS,
      postId: response.data.parentId,
      commentId,
      voteScore: response.data.voteScore,
      ...ActionUtils.successAction()
    }))
    .catch(reason => dispatch({
        type: DOWN_VOTE_COMMENT_FAILED,
        failReason: reason,
        ...ActionUtils.failedAction()
      })
    )
}

//endregion

//region deleteComment

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const deleteComment = commentId => dispatch => {

  dispatch({type: DELETE_COMMENT, ...ActionUtils.loadingAction()})

  API.deleteComment(commentId)
    .then(response => dispatch({
      type: DELETE_COMMENT_SUCCESS,
      postId: response.data.parentId,
      commentId,
      ...ActionUtils.successAction()
    }))
    .catch(reason => dispatch({
      type: DELETE_COMMENT_FAILED,
      failReason: reason,
      ...ActionUtils.failedAction()
    }))

}

//endregion