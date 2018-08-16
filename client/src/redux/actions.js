import actionTypes from './actionTypes';

export const showAlert = message => ({
  type: actionTypes.SHOW_ALERT,
  message
});

export const hideAlert = () => ({
  type: actionTypes.HIDE_ALERT
});
