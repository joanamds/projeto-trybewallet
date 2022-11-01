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
    const { email, expenses } = this.props;
    console.log(expenses);
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
