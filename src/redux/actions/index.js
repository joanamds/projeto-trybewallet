// Coloque aqui suas actions
// actions para o login
// actions para o wallet
import getCurrentCurrency from '../../services/economyAPI';

export const USER_FORM = 'USER_FORM';
export const FETCH_CURRENCY = 'FETCH_CURRENCY';
export const EXPENSE_FORM = 'EXPENSE_FORM';

export const userForm = (payload) => ({
  type: USER_FORM,
  payload,
});

export const fetchCurrency = (currencies) => ({
  type: FETCH_CURRENCY,
  currencies,
});

export const expenseForm = (payload) => ({
  type: EXPENSE_FORM,
  expenses: payload,
});

const fetchCurrentCurrency = async (dispatch) => {
  try {
    const currentCurrency = await getCurrentCurrency();
    const arrayCurrency = Object.keys(currentCurrency);
    const currencies = arrayCurrency.filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrency(currencies));
  } catch (error) {
    console.log(error);
  }
};

export const actionFetchCurrentCurrency = async () => fetchCurrentCurrency;
