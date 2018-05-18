import * as CategoriesActions from '../actions/CategoriesActions'

const initialCategoriesState = {
  categories: [],
  success: false,
  loading: false,
  failed: false,
  failReason: ''
}

const categories = (state = initialCategoriesState, action) => {

  const {categories, loading, success, failed, failReason} = action

  switch (action.type) {
    case CategoriesActions.ADD_ALL_CATEGORIES:
      return {
        ...state,
        success: success,
        loading: loading,
        failed: failed
      }

    case CategoriesActions.ADD_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: categories,
        success: success,
        loading: loading,
        failed: failed
      }

    case CategoriesActions.ADD_ALL_CATEGORIES_FAILED:
      return {
        ...state,
        success: success,
        loading: loading,
        failed: failed,
        failReason: failReason
      }

    default:
      return state

  }
}

export default categories
