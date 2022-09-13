import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const valuesexpenses = expenses
      .map(({ value, currency, exchangeRates }) => (
        parseFloat(value) * parseFloat(exchangeRates[currency].ask)));

    const totalExpenses = valuesexpenses
      .reduce((prevValue, currValue) => prevValue + currValue, 0).toFixed(2);

    return (
      <header>
        <h3 className="titleHeader">WALLIST</h3>
        <h3 data-testid="email-field">
          Usuário:
          {' '}
          { email }
        </h3>
        <h3 data-testid="total-field">
          Total:
          {' '}
          { totalExpenses }
        </h3>

        <h3 data-testid="header-currency-field">
          Moeda: BRL
        </h3>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
