import actionTypes from '../actionTypes';

const initialState = '';

export default (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.EDIT_MODEL:
      return action.model || state;

    default:
      return state;
  }

};
