import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiEdit3, FiPlusCircle } from 'react-icons/fi';
import fetchAPI from '../services';
import { fetchAPIData, submitDataWallet, editExpense } from '../redux/actions/index';

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
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPIData());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  clearInputs = () => {
    const { id } = this.state;
    const add = id + 1;

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: add,
    });
  };

  handleSubmitExpenses = async (event) => {
    event.preventDefault();
    const { dispatch, editor, idToEdit } = this.props;
    if (editor === false) {
      const data = await fetchAPI();
      this.setState({ exchangeRates: data });
      dispatch(submitDataWallet(this.state));
      this.clearInputs();
    }
    if (editor === true) {
      this.setState({ id: idToEdit }, () => {
        dispatch(editExpense(this.state));
        this.clearInputs();
      });
    }
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <section className="walletform">
        {/* <p className="p1">
          Organize suas despesas e conquiste mais a cada dia.
        </p> */}

        <form onSubmit={ this.handleSubmitExpenses }>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              placeholder="Valor da despesa"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              type="number"
              className="inputWallet"
              autoComplete="off"
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              placeholder="Descrição"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              type="text"
              className="inputWallet"
              autoComplete="off"
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              className="inputWallet"
            >
              {currencies.map((curr, index) => (
                <option
                  key={ index }
                  value={ curr }
                >
                  { curr }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Forma de pagamento
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              className="inputWallet"
            >
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito"> Cartão de débito </option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              id="tag"
              onChange={ this.handleChange }
              className="inputWallet"
            >
              <option value="Alimentação"> Alimentação </option>
              <option value="Lazer"> Lazer </option>
              <option value="Trabalho"> Trabalho </option>
              <option value="Saúde"> Saúde </option>
              <option value="Transporte"> Transporte </option>
            </select>
          </label>

          <button
            type="submit"
            className="buttonWallet"
          >
            { editor ? <FiEdit3 /> : <FiPlusCircle /> }
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(WalletForm);
