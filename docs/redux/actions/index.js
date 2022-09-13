import fetchAPI from '../../services';

const SAVE_INFO_USER = 'SAVE_INFO_USER';
const REQUEST_API = 'REQUEST_API';
const RECEIVE_API_SUCCESS = 'RECEIVE_API_SUCCESS';
const RECEIVE_API_FAILURE = 'RECEIVE_API_FAILURE';
const SUBMIT_DATA_WALLET = 'SUBMIT_DATA_WALLET';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_ID_EDITOR = 'EDIT_ID_EDITOR';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveInfoUser = (email) => ({
  type: SAVE_INFO_USER,
  email,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const receiveAPISuccess = (data) => ({
  type: RECEIVE_API_SUCCESS,
  currencies: data,
});

export const receiveAPIFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

export function fetchAPIData() {
  return async (dispatch) => {
    dispatch(requestAPI());

    try {
      const data = await fetchAPI();
      const result = Object.keys(data);
      const resultFiltered = result.filter((code) => code !== 'USDT');
      console.log(result);
      dispatch(receiveAPISuccess(resultFiltered));
    } catch (error) {
      dispatch(receiveAPIFailure(error));
    }
  };
}

export const submitDataWallet = (data) => ({
  type: SUBMIT_DATA_WALLET,
  data,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const editIdEditor = (id) => ({
  type: EDIT_ID_EDITOR,
  id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});
