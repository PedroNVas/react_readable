const payloadAction = (type, apiCallback) => {
  return {
    type,
    payload: apiCallback()
  };
};

export default payloadAction;