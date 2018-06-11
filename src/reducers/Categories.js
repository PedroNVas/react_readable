import * as CategoriesActions from "../actions/CategoriesActions";
import * as StoreUtils from "../utils/StoreUtils";

const initialCategoriesState = {
  categories: [],
  success: false,
  loading: false,
  failed: false
};

const categories = (state = initialCategoriesState, action) => {

  const { payload } = action;

  switch (action.type) {

    //region pending actions

    case CategoriesActions.FETCH_CATEGORIES_PENDING:
      return {
        ...state,
        categories: [],
        ...StoreUtils.loadingState()
      };

    //endregion

    //region fulfilled actions

    case CategoriesActions.FETCH_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: payload.data.categories,
        ...StoreUtils.successState()
      };

    //endregion

    //region rejected actions

    case CategoriesActions.FETCH_CATEGORIES_REJECTED:
      return {
        ...state,
        ...StoreUtils.failedState()
      };

    //endregion

    default:
      return state;

  }
};

export default categories;
