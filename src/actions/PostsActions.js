import * as API from "../api/API";
import payloadAction from "../utils/ActionsUtils";
import { uuid } from "../utils/AppUtils";
import { fetchPostComments } from "./CommentsActions";

//region fetchPosts

const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POSTS_PENDING = "FETCH_POSTS_PENDING";
export const FETCH_POSTS_FULFILLED = "FETCH_POSTS_FULFILLED";
export const FETCH_POSTS_REJECTED = "FETCH_POSTS_REJECTED";

export const fetchPosts = () => {
  return payloadAction(FETCH_POSTS, API.fetchPosts);
};

//endregion

//region fetchCategoryPosts

const FETCH_CATEGORY_POST = "FETCH_CATEGORY_POST";
export const FETCH_CATEGORY_POST_PENDING = "FETCH_CATEGORY_POST_PENDING";
export const FETCH_CATEGORY_POST_FULFILLED = "FETCH_CATEGORY_POST_FULFILLED";
export const FETCH_CATEGORY_POST_REJECTED = "FETCH_CATEGORY_POST_REJECTED";

export const fetchCategoryPosts = category => {
  return payloadAction(FETCH_CATEGORY_POST, () => API.fetchCategoryPosts(category));
};

//endregion

//region fetchPostDetails

const FETCH_POST_DETAILS = "FETCH_POST_DETAILS";
export const FETCH_POST_DETAILS_PENDING = "FETCH_POST_DETAILS_PENDING";
export const FETCH_POST_DETAILS_FULFILLED = "FETCH_POST_DETAILS_FULFILLED";
export const FETCH_POST_DETAILS_REJECTED = "FETCH_POST_DETAILS_REJECTED";

export const fetchPostDetails = postID => dispatch => {
  const result = dispatch(payloadAction(FETCH_POST_DETAILS, () => API.fetchPostDetails(postID)));

  return result
    .then(response => {
      const { id } = response.action.payload.data;
      dispatch(fetchPostComments(id));
    });
};

//endregion

//region votePost

const VOTE_ON_POST = "VOTE_ON_POST";
export const VOTE_ON_POST_PENDING = "VOTE_ON_POST_PENDING";
export const VOTE_ON_POST_FULFILLED = "VOTE_ON_POST_FULFILLED";
export const VOTE_ON_POST_REJECTED = "VOTE_ON_POST_REJECTED";

export const voteOnPost = (postId, voteType) => {
  return payloadAction(VOTE_ON_POST, () => API.voteOnPost(postId, voteType));
};

//endregion

//region deletePost

const DELETE_POST = "DELETE_POST";
export const DELETE_POST_PENDING = "DELETE_POST_PENDING";
export const DELETE_POST_FULFILLED = "DELETE_POST_FULFILLED";
export const DELETE_POST_REJECTED = "DELETE_POST_REJECTED";

export const deletePost = postId => {
  return payloadAction(DELETE_POST, () => API.deletePost(postId));
};

//endregion

//region sortPosts

export const SORT_POSTS = "SORT_POSTS";

export const sortPosts = ({ sortBy, orderBy }) => {
  return {
    type: SORT_POSTS,
    sortBy,
    orderBy
  };
};

//endregion

//region updatePost

export const EDIT_POST = "EDIT_POST";

export const editPost = post => {
  return {
    type: EDIT_POST,
    post
  };
};

export const CANCEL_EDIT_POST = "CANCEL_EDIT_POST";

export const cancelEditPost = () => {
  return {
    type: CANCEL_EDIT_POST
  };
};

const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_PENDING = "UPDATE_POST_PENDING";
export const UPDATE_POST_FULFILLED = "UPDATE_POST_FULFILLED";
export const UPDATE_POST_REJECTED = "UPDATE_POST_REJECTED";

export const updatePost = (postId, postTitle, postBody) => {
  return payloadAction(UPDATE_POST, () => API.updatePost(postId, postTitle, postBody));
};

//endregion

//region createPost

export const ADD_NEW_POST = "ADD_NEW_POST";

export const addNewPost = () => {
  return {
    type: ADD_NEW_POST,
    post: {
      id: uuid()
    }
  };
};

export const addNewCategoryPost = category => {
  return {
    type: ADD_NEW_POST,
    post: {
      id: uuid(),
      category
    }
  };
};

export const CANCEL_ADD_NEW_POST = "CANCEL_ADD_NEW_POST";

export const cancelAddNewPost = () => {
  return {
    type: CANCEL_ADD_NEW_POST
  };
};

const CREATE_POST = "CREATE_POST";
export const CREATE_POST_PENDING = "CREATE_POST_PENDING";
export const CREATE_POST_FULFILLED = "CREATE_POST_FULFILLED";
export const CREATE_POST_REJECTED = "CREATE_POST_REJECTED";

export const createPost = (postId, postTitle, postBody, postAuthor, postCategory) => {
  return payloadAction(CREATE_POST, () => API.createPost(postId, postTitle, postBody, postAuthor, postCategory));
};

//endregion