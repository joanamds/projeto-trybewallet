import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrentCurrency, expenseForm } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(await actionFetchCurrentCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(expenseForm(this.state));
  };

  render() {
    const { currencies } = this.props;
    const { expense, description, currency, method, tag } = this.state;
    return (
      <>
        <form>
          Formulário de despesa
        </form>
        <label htmlFor="expense-value">
          Valor da despesa:
          <input
            onChange={ this.handleChange }
            value={ expense }
            name="expense"
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            value={ description }
            onChange={ this.handleChange }
            name="description"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda da despesa
          <select
            onChange={ this.handleChange }
            value={ currency }
            data-testid="currency-input"
            name="currency"
          >
            {
              currencies.map((coin) => <option key={ coin }>{ coin }</option>)
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            name="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          onClick={ this.handleSubmit }
          type="submit"
        >
          Adicionar despesa
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
