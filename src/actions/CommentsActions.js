import * as API from "../api/API";
import payloadAction, { additionalPayloadAction } from "../utils/ActionsUtils";
import { uuid } from "../utils/AppUtils";

//region fetchPostComments

const GET_POST_COMMENTS = "GET_POST_COMMENTS";
export const GET_POST_COMMENTS_PENDING = "GET_POST_COMMENTS_PENDING";
export const GET_POST_COMMENTS_FULFILLED = "GET_POST_COMMENTS_FULFILLED";
export const GET_POST_COMMENTS_REJECTED = "GET_POST_COMMENTS_REJECTED";

export const fetchPostComments = postId => {
  return payloadAction(GET_POST_COMMENTS, () => API.fetchPostComments(postId));
};

//endregion

//region voteOnComment

const VOTE_ON_COMMENT = "VOTE_ON_COMMENT";
export const VOTE_ON_COMMENT_PENDING = "VOTE_ON_COMMENT_PENDING";
export const VOTE_ON_COMMENT_FULFILLED = "VOTE_ON_COMMENT_FULFILLED";
export const VOTE_ON_COMMENT_REJECTED = "VOTE_ON_COMMENT_REJECTED";

export const voteOnComment = (commentId, voteType) => {
  return additionalPayloadAction(
    VOTE_ON_COMMENT,
    () => API.voteOnComment(commentId, voteType),
    { commentId }
  );
};

//endregion

//region deleteComment

const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_PENDING = "DELETE_COMMENT_PENDING";
export const DELETE_COMMENT_FULFILLED = "DELETE_COMMENT_FULFILLED";
export const DELETE_COMMENT_REJECTED = "DELETE_COMMENT_REJECTED";

export const deleteComment = commentId => {
  return additionalPayloadAction(
    DELETE_COMMENT,
    () => API.deleteComment(commentId),
    { commentId }
  );
};

//endregion

//region fetchCommentDetails

const FETCH_COMMENT_DETAILS = "FETCH_COMMENT_DETAILS";
export const FETCH_COMMENT_DETAILS_PENDING = "FETCH_COMMENT_DETAILS_PENDING";
export const FETCH_COMMENT_DETAILS_FULFILLED =
  "FETCH_COMMENT_DETAILS_FULFILLED";
export const FETCH_COMMENT_DETAILS_REJECTED = "FETCH_COMMENT_DETAILS_REJECTED";

export const fetchCommentDetails = commentId => {
  return payloadAction(FETCH_COMMENT_DETAILS, () =>
    API.fetchCommentDetails(commentId)
  );
};

//endregion

//region cancelEditComment

export const CANCEL_EDIT_COMMENT = "CANCEL_EDIT_COMMENT";

export const cancelEditComment = () => {
  return {
    type: CANCEL_EDIT_COMMENT
  };
};

//endregion

//region updateComment

const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPDATE_COMMENT_PENDING = "UPDATE_COMMENT_PENDING";
export const UPDATE_COMMENT_FULFILLED = "UPDATE_COMMENT_FULFILLED";
export const UPDATE_COMMENT_REJECTED = "UPDATE_COMMENT_REJECTED";

export const updateComment = (commentId, commentBody) => {
  return payloadAction(UPDATE_COMMENT, () =>
    API.updateComment(commentId, commentBody)
  );
};

//endregion

//region createComment

export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";

export const addNewComment = postId => {
  return {
    type: ADD_NEW_COMMENT,
    comment: {
      id: uuid(),
      parentId: postId
    }
  };
};

export const CANCEL_ADD_NEW_COMMENT = "CANCEL_ADD_NEW_COMMENT";

export const cancelAddNewComment = () => {
  return {
    type: CANCEL_ADD_NEW_COMMENT
  };
};

const CREATE_COMMENT = "CREATE_COMMENT";
export const CREATE_COMMENT_PENDING = "CREATE_COMMENT_PENDING";
export const CREATE_COMMENT_FULFILLED = "CREATE_COMMENT_FULFILLED";
export const CREATE_COMMENT_REJECTED = "CREATE_COMMENT_REJECTED";

export const createComment = (
  commentId,
  commentBody,
  commentAuthor,
  postId
) => {
  return payloadAction(CREATE_COMMENT, () =>
    API.createComment(commentId, commentBody, commentAuthor, postId)
  );
};

//endregion
