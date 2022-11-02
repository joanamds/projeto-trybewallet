import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a tela da carteira', () => {
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

  test('Testa se possui o título "TrybeWallet"', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/carteira'] },
    );

    const title = screen.getByText('TrybeWallet');
    expect(title).toBeInTheDocument();
  });

  test('Testa se possui os inputs necessários para o formulário', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/carteira'] },
    );

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();

    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();

    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();

    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });

  test('Testa se é possível escrever no formulário', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/carteira'] },
    );

    const description = screen.getByTestId('description-input');
    userEvent.type(description, 'Bolo');

    expect(description).toHaveValue('Bolo');
  });

  test('Testa se renderiza as opções de método e categoria da despesa', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/carteira'] },
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(8);
  });

  test('Testa se a moeda para a conversão no header é "BRL"', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/carteira'] },
    );

    const getCoin = screen.getByTestId('header-currency-field');
    expect(getCoin).toHaveTextContent('BRL');
  });
});
