import { combineReducers } from 'redux'

import categories from './CategoriesReducer'
import comments from './CommentsReducers'
import posts from './PostsReducer'
import postDetails from './PostDetailsReducer'

export default combineReducers({
  categories,
  posts,
  comments,
  postDetails
})