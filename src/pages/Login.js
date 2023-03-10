import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Label, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { userForm } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleLogin = (event) => {
    const { dispatch, history } = this.props;
    event.preventDefault();
    dispatch(userForm(this.state));
    history.push('/carteira');
  };

  isValid = () => {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const passwordSize = 6;
    const validPassword = password.length >= passwordSize;

    return emailRegex.test(email) && validPassword;
  };

  render() {
    const { email, password } = this.props;
    return (
      <div className="login-page">
        <h1>Login</h1>
        <Label htmlFor="email">
          <FontAwesomeIcon icon={ faEnvelope } />
          Email
          <Input
            type="email"
            onChange={ this.handleChange }
            name="email"
            data-testid="email-input"
            value={ email }
          />
        </Label>
        <Label htmlFor="password">
          <FontAwesomeIcon icon={ faLock } />
          Senha
          <Input
            type="password"
            onChange={ this.handleChange }
            name="password"
            value={ password }
            data-testid="password-input"
          />
        </Label>
        <Button
          className="btn btn-primary"
          type="submit"
          disabled={ !this.isValid() }
          onClick={ this.handleLogin }
        >
          Entrar
        </Button>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
