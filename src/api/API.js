import axios from 'axios'
import { uuid } from '../utils/AppUtils'

const authenticationToken = Math.random().toString(36).substr(-8)

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 100,
  headers: {
    'Authorization': authenticationToken,
    'Accept': 'application/json'
  }
})

//region GET API

export const fetchCategories = () => instance.get('/categories')

export const fetchCategoryPosts = category => instance.get(`/${category}/posts`)

export const fetchPosts = () => instance.get('/posts')

export const fetchPostDetails = postID => instance.get(`/posts/${postID}`)

export const fetchPostComments = postId => instance.get(`/posts/${postId}/comments`)

export const fetchCommentDetails = commentId => instance.get(`/comments/${commentId}`)

//endregion GET API

//region POST API

export const createPost = ({title, body, author, category}) => instance.post('/posts', {
  id: uuid(),
  timestamp: Date.now(),
  title,
  body,
  author,
  category
})

export const createComment = ({body, author, parentId}) => instance.post('/comments', {
  id: uuid(),
  timestamp: Date.now(),
  body,
  author,
  parentId
})

export const voteOnPost = (postID, voteType) => instance.post(`/posts/${postID}`, {option: voteType})

export const voteOnComment = (commentId, voteType) => instance.post(`/comments/${commentId}`, {option: voteType})

//endregion

//region PUT API

export const updatePost = (postId, {title, body}) => instance.put(`/posts/${postId}`, {title, body})

export const updateComment = (commentId, {body}) => instance.put(`/comments/${commentId}`, {
  timestamp: Date.now(),
  body
})

//endregion

//region DELETE API

export const deletePost = postId => instance.delete(`/posts/${postId}`)

export const deleteComment = commentId => instance.delete(`/comments/${commentId}`)

//endregion
