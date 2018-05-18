import * as API from '../api/API'
import * as ReducerUtils from '../utils/ReducerUtils'

export const ADD_ALL_CATEGORIES_SUCCESS = 'ADD_ALL_CATEGORIES_SUCCESS'
export const ADD_ALL_CATEGORIES_FAILED = 'ADD_ALL_CATEGORIES_FAILED'
export const ADD_ALL_CATEGORIES = 'ADD_ALL_CATEGORIES'

export const fetchAllCategories = () => dispatch => {

  dispatch({type: ADD_ALL_CATEGORIES, ...ReducerUtils.loadingAction()})

  API.fetchAllCategories()
    .then(response => dispatch({
      type: ADD_ALL_CATEGORIES_SUCCESS,
      categories: response.data.categories,
      ...ReducerUtils.successAction()
    }))
    .catch(reason => dispatch({
      type: ADD_ALL_CATEGORIES_FAILED,
      failReason: reason,
      ...ReducerUtils.failedAction()
    }))

}

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

// // without thunk middleware
// export const receiveTodos = todos => ({
//   type: RECEIVE_TODOS,
//   todos
// });
//
// // With thunk middleware
// export const fetchTodos = () => dispatch => (
//   TodoAPIUtil
//     .fetchTodos()
//     .then(todos => dispatch(receiveTodos(todos)))
// );

