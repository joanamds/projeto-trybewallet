import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Table', () => {
  const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

  test('Se a tabela possui os cabeçalhos corretos', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const headers = screen.queryAllByRole('columnheader');
    expect(headers).toHaveLength(9);

    headers.map((header, i) => expect(headers[i]).toHaveTextContent(tableHeaders[i]));
  });
});
