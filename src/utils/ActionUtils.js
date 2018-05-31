export const loadingAction = () => {
  return {
    success: false,
    loading: true,
    failed: false
  }
}

export const successAction = () => {
  return {
    success: true,
    loading: false,
    failed: false
  }
}

export const failedAction = () => {
  return {
    success: false,
    loading: false,
    failed: true
  }
}
