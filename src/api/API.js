import axios from "axios";

let authenticationToken = localStorage.token;
if (!authenticationToken)
  authenticationToken = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 100,
  headers: {
    Authorization: authenticationToken,
    Accept: "application/json"
  }
});

//region GET API

export const fetchCategories = () => instance.get("/categories");

export const fetchCategoryPosts = category =>
  instance.get(`/${category}/posts`);

export const fetchPosts = () => instance.get("/posts");

export const fetchPostDetails = postId => instance.get(`/posts/${postId}`);

export const fetchPostComments = postId =>
  instance.get(`/posts/${postId}/comments`);

export const fetchCommentDetails = commentId =>
  instance.get(`/comments/${commentId}`);

//endregion GET API

//region POST API

export const createPost = (id, title, body, author, category) =>
  instance.post("/posts", {
    id,
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  });

export const createComment = (id, body, author, parentId) =>
  instance.post("/comments", {
    id,
    timestamp: Date.now(),
    body,
    author,
    parentId
  });

export const voteOnPost = (postId, voteType) =>
  instance.post(`/posts/${postId}`, { option: voteType });

export const voteOnComment = (commentId, voteType) =>
  instance.post(`/comments/${commentId}`, { option: voteType });

//endregion

//region PUT API

export const updatePost = (postId, title, body) =>
  instance.put(`/posts/${postId}`, {
    title,
    body
  });

export const updateComment = (commentId, body) =>
  instance.put(`/comments/${commentId}`, {
    timestamp: Date.now(),
    body
  });

//endregion

//region DELETE API

export const deletePost = postId => instance.delete(`/posts/${postId}`);

export const deleteComment = commentId =>
  instance.delete(`/comments/${commentId}`);

//endregion
