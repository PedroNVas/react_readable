import * as API from '../api/API'
import * as ReducerUtils from '../utils/ActionUtils'

export const ADD_ALL_CATEGORIES_SUCCESS = 'ADD_ALL_CATEGORIES_SUCCESS'
export const ADD_ALL_CATEGORIES_FAILED = 'ADD_ALL_CATEGORIES_FAILED'
export const ADD_ALL_CATEGORIES = 'ADD_ALL_CATEGORIES'

export const fetchCategories = () => dispatch => {

  dispatch({type: ADD_ALL_CATEGORIES, ...ReducerUtils.loadingState()})

  API.fetchCategories()
    .then(response => dispatch({
      type: ADD_ALL_CATEGORIES_SUCCESS,
      categories: response.data.categories,
      ...ReducerUtils.successState()
    }))
    .catch(reason => dispatch({
      type: ADD_ALL_CATEGORIES_FAILED,
      failReason: reason,
      ...ReducerUtils.failedState()
    }))
}