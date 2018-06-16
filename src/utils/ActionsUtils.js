const payloadAction = (type, apiCallback) => {
  return {
    type,
    payload: apiCallback()
  };
};

export const additionalPayloadAction = (
  type,
  apiCallback,
  additionalObject
) => {
  return {
    type,
    payload: apiCallback(),
    meta: {
      ...additionalObject
    }
  };
};

export default payloadAction;
