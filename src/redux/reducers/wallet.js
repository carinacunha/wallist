const REQUEST_API = 'REQUEST_API';
const RECEIVE_API_SUCCESS = 'RECEIVE_API_SUCCESS';
const SUBMIT_DATA_WALLET = 'SUBMIT_DATA_WALLET';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const EDIT_ID_EDITOR = 'EDIT_ID_EDITOR';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case RECEIVE_API_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SUBMIT_DATA_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  case EDIT_ID_EDITOR:
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .map((elem) => (
          elem.id === state.idToEdit ? ({ ...elem, ...action.expense }) : ({ ...elem }))),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
