//region state utils

export const loadingState = () => {
  return {
    success: false,
    loading: true,
    failed: false
  };
};

export const successState = () => {
  return {
    success: true,
    loading: false,
    failed: false
  };
};

export const failedState = () => {
  return {
    success: false,
    loading: false,
    failed: true
  };
};

//endregion

//region action creator helper

export const loadingAction = (type) => {
  return {
    type,
    ...loadingState()
  };
};

export const failedAction = (type, failedReason) => {
  return {
    type,
    failedReason,
    ...failedState()
  };
};

//endregion
