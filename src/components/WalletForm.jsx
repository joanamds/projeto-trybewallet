import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Label, Form, Button } from 'reactstrap';
import { actionFetchCurrentCurrency, expenseForm, editForm } from '../redux/actions';
import getCurrentCurrency from '../services/economyAPI';

const initialTag = 'Alimentação';
const initialMethod = 'Dinheiro';
const initialCurrency = 'USD';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: initialCurrency,
      method: initialMethod,
      tag: initialTag,
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
        currency: initialCurrency,
        method: initialMethod,
        tag: initialTag,
      });
    });
  };

  handleEdit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(editForm(this.state));
    this.setState({
      value: '',
      description: '',
      currency: initialCurrency,
      method: initialMethod,
      tag: initialTag,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <Form className="form-content">
        <Label htmlFor="value">
          Valor da despesa:
          <Input
            onChange={ this.handleChange }
            value={ value }
            name="value"
            type="number"
            data-testid="value-input"
          />
        </Label>
        <Label htmlFor="description">
          Descrição da despesa:
          <Input
            value={ description }
            onChange={ this.handleChange }
            name="description"
            type="text"
            data-testid="description-input"
          />
        </Label>
        <Label htmlFor="currency">
          Moeda da despesa
          <Input
            type="select"
            onChange={ this.handleChange }
            value={ currency }
            data-testid="currency-input"
            name="currency"
          >
            {
              currencies.map((coin) => <option key={ coin }>{ coin }</option>)
            }
          </Input>
        </Label>
        <Label htmlFor="method">
          Método de pagamento:
          <Input
            type="select"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </Input>
        </Label>
        <Label htmlFor="tag">
          Categoria:
          <Input
            type="select"
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
          </Input>
        </Label>
        {editor ? (
          <Button
            className="btn btn-info"
            onClick={ this.handleEdit }
            type="submit"
          >
            Editar despesa
          </Button>
        )
          : (
            <Button
              className="btn btn-primary"
              color="blue"
              data-testid="submit-form"
              onClick={ this.handleSubmit }
              type="submit"
            >
              Adicionar despesa

            </Button>
          )}
      </Form>
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
