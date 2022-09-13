// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const SAVE_INFO_USER = 'SAVE_INFO_USER';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_INFO_USER:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
