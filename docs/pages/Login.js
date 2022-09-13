import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveInfoUser } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  checkEmailFormat = (email) => /\S+@\S+\.\S+/.test(email);

  checkPassword = (password) => {
    const passwordMinLength = 5;
    return password.length >= passwordMinLength;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { email, password } = this.state;

    this.setState({
      [name]: value,
      isDisable: !(this.checkEmailFormat(email) && (this.checkPassword(password))),
    });
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveInfoUser(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div>
        <h1>WALLIST </h1>
        <p className="wallet"><strong>Sua carteira digital</strong></p>

        <main>
          <img
            src="https://img.freepik.com/vetores-gratis/conceito-financeiro-de-economia-de-dinheiro_74855-7849.jpg?w=1380&t=st=1662071235~exp=1662071835~hmac=0c7438db25ddbf37477570a9b863ede69084b08029ceb71a47d70561972937e6"
            alt="not found"
          />
          <section className="login">
            <fieldset>
              <p className="login">Login</p>

              <input
                data-testid="email-input"
                label="Email: "
                type="email"
                placeholder="usuario@gmail.com"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                className="inputslogin"
                autoComplete="off"
                required
              />
              <input
                data-testid="password-input"
                label="Password: "
                type="password"
                placeholder="senha"
                onChange={ this.handleChange }
                value={ password }
                name="password"
                className="inputslogin"
                autoComplete="off"
                required
              />

              <button
                className="buttonLogin"
                type="button"
                onClick={ this.handleSubmit }
                disabled={ isDisable }
              >
                Entrar
              </button>
            </fieldset>
          </section>

        </main>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
