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

    //region loading actions

    case CategoriesActions.GET_CATEGORIES:
      return {
        ...state,
        success,
        loading,
        failed
      }

    //endregion

    //region failed actions

    case CategoriesActions.GET_CATEGORIES_FAILED:
      return {
        ...state,
        success,
        loading,
        failed,
        failReason
      }

    //endregion

    //region success actions

    case CategoriesActions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories,
        success,
        loading,
        failed
      }

    //endregion

    default:
      return state

  }
}

export default categories
