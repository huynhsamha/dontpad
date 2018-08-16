import actionTypes from './actionTypes';

export const showAlert = message => ({
  type: actionTypes.SHOW_ALERT,
  message
});

export const hideAlert = () => ({
  type: actionTypes.HIDE_ALERT
});

export const editModel = model => ({
  type: actionTypes.EDIT_MODEL,
  model
});
