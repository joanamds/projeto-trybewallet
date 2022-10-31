// Coloque aqui suas actions
// actions para o login
// actions para o wallet

export const USER_FORM = 'USER_FORM';
export const WALLET_FORM = 'WALLET_FORM';

export const userForm = (payload) => ({
  type: USER_FORM,
  payload,
});

export const walletForm = (payload) => ({
  type: WALLET_FORM,
  payload,
});
