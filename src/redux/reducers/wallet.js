import { FETCH_CURRENCY, EXPENSE_FORM, DELETE_EXPENSE,
  EDIT_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSE_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      editor: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE: {
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  }
  default:
    return state;
  }
};

export default wallet;
