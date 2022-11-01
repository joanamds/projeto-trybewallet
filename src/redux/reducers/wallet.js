import { WALLET_FORM } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_FORM:
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
      editor: action.editor,
      idToEdit: action.idToEdit,
    };
  default:
    return state;
  }
};

export default wallet;
