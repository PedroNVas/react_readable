import * as API from '../api/API'
import * as ActionUtils from '../utils/ActionUtils'

//region categories action creator helper

const categoriesSuccessfulAction = (type, categories) => {
  return {
    type,
    categories,
    ...ActionUtils.successState()
  }
}

//endregion

//region fetchCategories

export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export const fetchCategories = () => dispatch => {

  dispatch(ActionUtils.loadingAction(GET_CATEGORIES))

  API.fetchCategories()
    .then(response => dispatch(categoriesSuccessfulAction(GET_CATEGORIES_SUCCESS, response.data.categories)))
    .catch(reason => dispatch(ActionUtils.failedAction(GET_CATEGORIES_FAILED, reason)))
}

//endregion