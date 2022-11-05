import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faWallet, faCoins } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const getExpenses = [...expenses];
    const getTotalValue = getExpenses.map((expense) => {
      const { exchangeRates } = expense;
      const getValues = Object.values(exchangeRates);
      const getCurr = getValues.find((value) => value.code === expense.currency);
      const currencyValue = Number(getCurr.ask);
      const value = expense.value * currencyValue;
      const finalValue = Number(value.toFixed(2));
      return finalValue;
    });
    const total = getTotalValue.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <Navbar
        className="navbar bg-light"
      >
        <NavbarBrand>
          <FontAwesomeIcon icon={ faWallet } />
          TrybeWallet
        </NavbarBrand>
        <NavbarText data-testid="email-field">
          <FontAwesomeIcon icon={ faEnvelope } />
          { email }
        </NavbarText>
        <NavbarText data-testid="total-field">
          { this.totalExpenses() }
        </NavbarText>
        <NavbarText data-testid="header-currency-field">
          <FontAwesomeIcon icon={ faCoins } />
          BRL
        </NavbarText>
      </Navbar>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
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
  })),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
