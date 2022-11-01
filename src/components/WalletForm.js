import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrentCurrency } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(await actionFetchCurrentCurrency());
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <form>
          Formulário de despesa
        </form>
        <label htmlFor="expense-value">
          Valor da despesa:
          <input
            name="expense-value"
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="expense-description">
          Descrição da despesa:
          <input
            name="expense-description"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda da despesa
          <select data-testid="currency-input" name="currency">
            {
              currencies.map((currency) => <option key={ currency }>{ currency }</option>)
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select data-testid="method-input" name="method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Método de pagamento:
          <select data-testid="tag-input" name="category">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
