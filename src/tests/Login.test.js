import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a tela de Login', () => {
  const email = 'email@email.com';
  const initialStateMock = {
    user: {
      email: '',
    },
    wallet: {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };

  test('Se a tela inicial é renderizada na página de Login', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/'] },
    );

    const loginTitle = screen.getByRole('heading', { level: 1 });
    expect(loginTitle).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox');
    expect(inputEmail).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('Testa se é possível digitar no campo de email', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/'] },
    );

    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);

    expect(inputEmail).toHaveValue(email);
  });

  test('Testa se ao logar é redirecionado para a página da carteira', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/'] },
    );

    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);

    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '123456');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
