import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const methodCard = 'Cartão de débito';
const tagType = 'Alimentação';

const INITIAL_STATE = {
  user: {
    email: 'trybe@wallet.com',
    senha: '123456',
  },
  wallet: {
    currencies: Object.keys(mockData).filter((key) => key !== 'USDT'),
    expenses: [
      {
        id: 0,
        value: '340',
        currency: 'EUR',
        method: 'Cartão de débito',
        tag: 'Lazer',
        description: 'Shopping',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: tagType,
        description: 'Almoço',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

const STATE_EDITOR = {
  user: {
    email: 'trybe@wallet.com',
    senha: '123456',
  },
  wallet: {
    currencies: Object.keys(mockData).filter((key) => key !== 'USDT'),
    expenses: [
      {
        id: 0,
        value: '340',
        currency: 'EUR',
        method: methodCard,
        tag: 'Lazer',
        description: 'Shopping',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: tagType,
        description: 'Almoço',
        exchangeRates: mockData,
      },
    ],
    editor: true,
    idToEdit: 0,
  },
};

const getInputsAndSelect = () => {
  const title = screen.getByRole('heading', { level: 1 });
  const emailPrint = screen.getByTestId('email-field');
  const valueText = screen.getByText(/Despesas totais/i);
  const total = screen.getByTestId('total-field');
  const currencyText = screen.getByTestId('header-currency-field');
  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const currencyInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');
  const table = screen.getByRole('columnheader', { name: /descrição/i });

  return {
    title,
    emailPrint,
    valueText,
    total,
    currencyText,
    valueInput,
    descriptionInput,
    currencyInput,
    methodInput,
    tagInput,
    table,
  };
};

describe('Testes dos componentes página inicial usado React-Redux', () => {
  test('Verifica se os inputs de email, senha e botão são renderizados na pagina inicial', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailInput);
    expect(inputEmail).toBeInTheDocument();

    const inputPass = screen.getByTestId(passwordInput);
    expect(inputPass).toBeInTheDocument();

    const button = screen.getAllByRole('button');
    expect(button[0]).toBeInTheDocument();
  });

  test('Verifica se a página de login é renderizada de forma correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica a submissão dos valores na página inicial', () => {
    const pathHome = '/';

    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathHome] },
    );

    const inputEmail = screen.getByTestId(emailInput);
    const inputPass = screen.getByTestId(passwordInput);
    const button = screen.getAllByRole('button');
    const emailText = 'catarina@gmail.com';

    userEvent.type(inputEmail, emailText);
    userEvent.type(inputPass, 'testedasenha');

    expect(inputEmail).toHaveValue(emailText);
    expect(inputPass).toHaveValue('testedasenha');

    userEvent.click(button[0]);

    const { user } = store.getState();
    expect(user).toEqual({
      email: 'catarina@gmail.com',
    });
  });

  test('Verifica se o email e senha são validados', () => {
    const pathHome = '/';

    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathHome] },
    );

    const inputEmail = screen.getByTestId(emailInput);
    const inputPass = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button');

    userEvent.type(inputEmail, 'testeemail');
    userEvent.type(inputPass, '45678');
    expect(button).toHaveAttribute('disabled');
    userEvent.type(inputEmail, 'carina@email.com');
    userEvent.type(inputPass, '123987');
    expect(button).not.toHaveAttribute('disabled');
  });
});

describe('Teste dos componentes da página de cadastro das despesas', () => {
  test('Verifica se os componentes são renderizados na página /carteira ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');
    const buttonSubmit = screen.getByText(/Adicionar despesa/i);
    const {
      title,
      emailPrint,
      valueText,
      total,
      currencyText,
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
      table,
    } = getInputsAndSelect();

    expect(title).toBeInTheDocument();
    expect(emailPrint).toBeInTheDocument();
    expect(valueText).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(currencyText).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(valueText).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(tagInput).toHaveLength(5);
    expect(buttonSubmit).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });

  test('Verifica se os campos são resetados', () => {
    const pathWallet = '/carteira';
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathWallet] },
    );

    const {
      valueInput,
      descriptionInput,
    } = getInputsAndSelect();

    const buttonSubmit = screen.getByRole('button', { type: 'submit' });

    userEvent.type(valueInput, '50');
    userEvent.type(descriptionInput, 'mercado');
    userEvent.click(buttonSubmit);

    expect(valueInput.innerHTML).toBe('');
    expect(descriptionInput.innerHTML).toBe('');
  });

  test('Verifica se os campos são armazenados no estado global', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE },
    );

    const {
      valueInput,
      descriptionInput,
    } = getInputsAndSelect();
    const buttonSubmit = screen.getAllByRole('button', { type: 'submit' });

    userEvent.type(valueInput, '50');
    userEvent.type(descriptionInput, 'mercado');

    userEvent.click(buttonSubmit[0]);

    const expense = [
      {
        id: 2,
        value: '50',
        currency: 'EUR',
        method: methodCard,
        tag: 'Lazer',
        description: 'mercado',
        exchangeRates: mockData,
      },
    ];
    waitFor(() => expect(store.getState().wallet.expenses[2]).toEqual(expense[0]));
  });

  test('Verifica se a despesa é excluída', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE },
    );
    const deleteButton = screen.getAllByTestId('delete-btn');
    userEvent.click(deleteButton[0]);

    const expense = [
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: tagType,
        description: 'Almoço',
        exchangeRates: mockData,
      },
    ];
    expect(store.getState().wallet.expenses).toEqual(expense);
  });
});

test('Verifica se ao clicar no botão a despesa é editada', () => {
  const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
  const buttonEdit = screen.getAllByTestId('edit-btn');
  const buttonSaveEdited = screen.getAllByRole('button', { name: /Editar/i });
  const {
    valueInput,
    descriptionInput,
  } = getInputsAndSelect();

  userEvent.click(buttonEdit[0]);

  userEvent.type(valueInput, '100');
  userEvent.type(descriptionInput, 'mercado');
  userEvent.click(buttonSaveEdited[0]);

  const expense = [
    {
      id: 0,
      value: '100',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Saúde',
      description: 'mercado',
      exchangeRates: mockData,
    },
  ];
  waitFor(() => expect(store.getState().wallet.expenses[0]).toEqual(expense[0]));
});

test('Verifica o fetch da API', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
});

test('Verifica se quando o editor é true o id é atualizado', () => {
  const { store } = renderWithRouterAndRedux(
    <Wallet />,
    { initialState: STATE_EDITOR },
  );

  const {
    valueInput,
    descriptionInput,
  } = getInputsAndSelect();
  const buttonSubmit = screen.getAllByRole('button', { type: 'submit' });
  const buttonEdit = screen.getAllByTestId('edit-btn');
  userEvent.click(buttonEdit[0]);
  userEvent.type(valueInput, '50');
  userEvent.type(descriptionInput, 'mercado');

  userEvent.click(buttonSubmit[0]);

  const expenseEdited = {
    idToEdit: 1,
  };
  expect(store.getState().wallet.idToEdit).toEqual(expenseEdited.idToEdit);
});
