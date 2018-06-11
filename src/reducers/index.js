import { combineReducers } from "redux";

import categories from "./Categories";
import categoryPosts from "./CategoryPosts";
import commentCreate from "./CommentCreate";
import commentEdit from "./CommentEdit";
import comments from "./Comments";
import postCreate from "./PostCreate";
import postDetails from "./PostDetails";
import postEdit from "./PostEdit";
import posts from "./Posts";

export default combineReducers({
  categories,
  categoryPosts,
  posts,
  postDetails,
  postEdit,
  postCreate,
  comments,
  commentEdit,
  commentCreate
});