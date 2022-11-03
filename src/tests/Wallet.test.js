import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a tela da carteira', () => {
  const descriptionInput = 'description-input';
  test('Testa se está na rota correta', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const { pathname } = history.location;
    expect(pathname).toEqual('/carteira');
  });

  test('Testa se possui o título "TrybeWallet"', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const title = screen.getByText('TrybeWallet');
    expect(title).toBeInTheDocument();
  });

  test('Testa se possui os inputs necessários para o formulário', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();

    const description = screen.getByTestId(descriptionInput);
    expect(description).toBeInTheDocument();

    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();

    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();

    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });

  test('Testa se é possível escrever na descrição do gasto', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const description = screen.getByTestId(descriptionInput);
    userEvent.type(description, 'Almoço ');

    expect(description).toHaveValue('Almoço ');

    userEvent.type(description, 'no restaurante');
    expect(description).toHaveValue('Almoço no restaurante');
  });

  test('Testa se renderiza as opções de método e categoria da despesa', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(8);
  });

  test('Testa se a moeda para a conversão no header é "BRL"', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const getCoin = screen.getByTestId('header-currency-field');
    expect(getCoin).toHaveTextContent('BRL');
  });

  test('Testa se é possível selecionar o método de pagamento e a tag corretamente', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const select = screen.getAllByRole('combobox');

    userEvent.selectOptions(
      select[1],
      screen.getByRole('option', { name: 'Dinheiro' }),
    );
    userEvent.selectOptions(
      select[2],
      screen.getByRole('option', { name: 'Alimentação' }),
    );

    expect(select[1]).toHaveValue('Dinheiro');
    expect(select[2]).toHaveValue('Alimentação');
  });

  test('Testa se é possível adicionar um gasto', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const button = screen.getByRole('button');

    const description = screen.getByTestId(descriptionInput);
    userEvent.type(description, 'Carteira');
    userEvent.click(button);

    const descriptionAdded = await screen.findByText('Carteira');

    expect(descriptionAdded).toBeInTheDocument();
  });

  test('Testa se renderiza as moedas corretamente', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const coin = await screen.findByText('USD');

    expect(coin).toBeInTheDocument();
  });
});
