import React, { Component } from 'react';

class Table extends Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table className="table-content">
        Table
        <tr>
          { tableHeaders.map((header) => <th key={ header }>{ header }</th>) }
        </tr>
        {/* através da lista salva de gastos, fazer um map desta lista.
        cada elemento tera um tr como no cabeçalho englobando os td que
        terão cada elemento extraído com a ordem do cabeçalho
        obs: terei que fazer um find nesse map para extrair a moeda de conversão que foi utilizada no gasto
        obs2: terá que ser extraído o "name" e não o "code" das moedas */}
      </table>
    );
  }
}

// fazer o mapStateToProps para pegar wallet.expenses do estado global da aplicação
// importar o connect para englobar o componente com o mapStateToProps
export default Table;
