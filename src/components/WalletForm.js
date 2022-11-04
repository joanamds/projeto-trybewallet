import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrentCurrency, expenseForm } from '../redux/actions';
import getCurrentCurrency from '../services/economyAPI';
// editForm

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    let id = 0;
    const actualCurrency = await getCurrentCurrency();
    const getId = expenses.length === 0 ? id : id += 1;
    this.setState(() => ({
      id: getId,
      exchangeRates: actualCurrency,
    }), () => {
      dispatch(expenseForm(this.state));
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    });
  };

  // handleEdit = (event) => {
  //   event.preventDefault();
  //   const { dispatch, expenses, idToEdit } = this.props;
  //   const expenseFound = expenses.find((expense) => expense.id === idToEdit);
  //   this.setState(() => ({
  //     id: idToEdit,
  //     exchangeRates: expenseFound.exchangeRates,
  //     currency: expenseFound.currency,
  //   }), () => {
  //     dispatch(editForm(this.state));
  //     this.setState({
  //       value: '',
  //       description: '',
  //       currency: 'USD',
  //       method: 'Dinheiro',
  //       tag: 'Alimentação',
  //     });
  //   });
  // };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <form>
          Formulário de despesa
        </form>
        <label htmlFor="value">
          Valor da despesa:
          <input
            onChange={ this.handleChange }
            value={ value }
            name="value"
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
        {editor ? (
          <button
            onClick={ this.handleSubmit }
            type="submit"
          >
            Editar despesa
          </button>
        )
          : (
            <button
              data-testid="submit-form"
              onClick={ this.handleSubmit }
              type="submit"
            >
              Adicionar despesa
            </button>
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  // idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
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

export default connect(mapStateToProps)(WalletForm);
