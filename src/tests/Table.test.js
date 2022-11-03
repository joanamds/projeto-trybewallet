import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Table', () => {
  const descriptionInput = 'description-input';
  const deleteButton = 'delete-btn';
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

  test('Testa se renderiza corretamente os botões de Editar e de Excluir', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const button = screen.getByRole('button');

    const description = screen.getByTestId(descriptionInput);
    userEvent.type(description, 'Sofá');
    userEvent.click(button);

    const buttonEdit = await screen.findByTestId('edit-btn');
    const buttonDelete = await screen.findByTestId('delete-btn');

    expect(buttonDelete).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();
  });

  test('Testa se é possível remover um gasto', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const button = screen.getByRole('button');

    const description = screen.getByTestId(descriptionInput);
    userEvent.type(description, 'Celular');
    userEvent.click(button);

    const buttonDelete = await screen.findByTestId(deleteButton);
    userEvent.click(buttonDelete);

    const noneButton = await screen.queryByTestId(deleteButton);

    expect(noneButton).toBeNull();
  });

  test('Testa se ao clicar em editar modifica o botão para "Editar despesa"', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const button = screen.getByRole('button');

    const description = screen.getByTestId(descriptionInput);
    userEvent.type(description, 'Celular');
    userEvent.click(button);

    const buttonEdit = await screen.findByTestId('edit-btn');
    userEvent.click(buttonEdit);

    expect(button).toHaveTextContent('Editar despesa');
  });
});
