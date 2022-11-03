import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testa o componente Table', () => {
  const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
  // const email = 'email@email.com';
  // const password = '123456';
  // const emailTestId = 'email-input';
  const initialStateMock = [{
    user: {
      email: '',
    },
    wallet: {
      currencies: [mockData],
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  }];

  test('Se a tabela possui os cabeçalhos corretos', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: initialStateMock, initialEntries: ['/carteira'] },
    );

    const headers = screen.queryAllByRole('columnheader');
    expect(headers).toHaveLength(9);

    headers.map((header, i) => expect(headers[i]).toHaveTextContent(tableHeaders[i]));
  });
});
