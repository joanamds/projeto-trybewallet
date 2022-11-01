import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      total: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.props;
    const getExpenses = [...expenses];

    const getActualCurrency = getExpenses.map((expense) => {
      const { exchangeRates } = expense;
      const getValues = Object.values(exchangeRates);
      const getCurrency = getValues.find((value) => value.code === expense.currency);
      const currencyValue = Number(getCurrency.ask);
      const value = expense.value * currencyValue;
      const finalValue = value.toFixed(2);
      return Number(finalValue);
    });

    console.log(getActualCurrency);

    const { total } = this.state;
    return (
      <>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          { total }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
