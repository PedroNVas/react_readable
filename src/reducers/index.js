import { combineReducers } from 'redux'

import categories from './CategoriesReducer'
import postDetails from './PostDetailsReducer'
import posts from './PostsReducer'

export default combineReducers({
  categories,
  posts,
  postDetails
})