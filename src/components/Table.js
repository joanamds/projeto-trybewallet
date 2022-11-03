import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    const expensesArray = [...expenses];
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table className="table-content">
        Table
        <tr>
          { tableHeaders.map((header) => <th key={ header }>{ header }</th>) }
        </tr>
        {expensesArray.length > 0
            && expensesArray.map((expense) => {
              const { exchangeRates } = expense;
              const getValues = Object.values(exchangeRates);
              const getCurr = getValues.find((value) => value.code === expense.currency);
              const currencyValue = Number(getCurr.ask);
              const numberValue = Number(expense.value);
              const value = numberValue * currencyValue;
              return (
                <tbody key={ expense.id }>
                  <tr key={ expense.id }>
                    <td>
                      { expense.description }
                    </td>
                    <td>
                      { expense.tag }
                    </td>
                    <td>
                      { expense.method }
                    </td>
                    <td>
                      { numberValue.toFixed(2) }
                    </td>
                    <td>
                      { getCurrency.name }
                    </td>
                    <td>
                      { currencyValue.toFixed(2) }
                    </td>
                    <td>
                      { value.toFixed(2) }
                    </td>
                    <td>
                      Real
                    </td>
                    <td>
                      <button type="button" data-testid="edit-btn">Editar</button>
                      <button type="button" data-testid="delete-btn">Excluir</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string,
      bid: PropTypes.string,
      code: PropTypes.string,
      codein: PropTypes.string,
      create_date: PropTypes.string,
      high: PropTypes.string,
      low: PropTypes.string,
      name: PropTypes.string,
      pctChange: PropTypes.string,
      timestamp: PropTypes.string,
      varBid: PropTypes.string,
    }),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
