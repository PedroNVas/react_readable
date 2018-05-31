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
        success,
        loading,
        failed
      }

    case CategoriesActions.ADD_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories,
        success,
        loading,
        failed
      }

    case CategoriesActions.ADD_ALL_CATEGORIES_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    default:
      return state

  }
}

export default categories
