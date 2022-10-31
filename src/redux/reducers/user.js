// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_FORM } from '../actions';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_FORM:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default user;
