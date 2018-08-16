import actionTypes from '../actionTypes';

const initialState = {
  show: false,
  message: 'Message here'
};

export default (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.SHOW_ALERT:
      return { ...state, show: true, message: action.message };

    case actionTypes.HIDE_ALERT:
      return { ...state, show: false };

    default:
      return state;
  }

};
