import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { deleteExpense, editIdEditor } from '../redux/actions';

class Table extends Component {
  handleDelete = (event) => {
    const { id } = event.target;
    const { dispatch, expenses } = this.props;
    const maintainedExpenses = expenses.filter((exp) => exp.id !== Number(id));
    dispatch(deleteExpense(maintainedExpenses));
  };

  handleEdit = (event) => {
    const { id } = event.target;
    console.log(id);
    const { dispatch } = this.props;
    dispatch(editIdEditor(Number(id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({
            id, currency, description, exchangeRates, method, tag, value,
          }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ parseFloat(value).toFixed(2) }</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  id={ id }
                  data-testid="edit-btn"
                  type="button"
                  onClick={ this.handleEdit }
                >
                  <FiEdit3 />
                </button>
                <button
                  id={ id }
                  data-testid="delete-btn"
                  type="button"
                  onClick={ this.handleDelete }
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
