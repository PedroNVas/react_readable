import * as API from "../api/API";

import payloadAction from "../utils/ActionsUtils";

//region fetchCategories

const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_CATEGORIES_PENDING = "FETCH_CATEGORIES_PENDING";
export const FETCH_CATEGORIES_FULFILLED = "FETCH_CATEGORIES_FULFILLED";
export const FETCH_CATEGORIES_REJECTED = "FETCH_CATEGORIES_REJECTED";

export const fetchCategories = () => {
  return payloadAction(FETCH_CATEGORIES, API.fetchCategories);
};

//endregion