// Coloque aqui suas actions
// actions para o login
// actions para o wallet
import getCurrentCurrency from '../../services/economyAPI';

export const USER_FORM = 'USER_FORM';
export const WALLET_FORM = 'WALLET_FORM';

export const userForm = (payload) => ({
  type: USER_FORM,
  payload,
});

export const walletForm = (payload) => ({
  type: WALLET_FORM,
  currencies: payload,
});

const fetchCurrentCurrency = async (dispatch) => {
  try {
    const currentCurrency = await getCurrentCurrency();
    dispatch(walletForm(currentCurrency));
  } catch (error) {
    console.log(error);
  }
};

export const actionFetchCurrentCurrency = async () => fetchCurrentCurrency;
