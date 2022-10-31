import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <h1>Login</h1>
        <label htmlFor="email">
          Email
          <input type="email" name="email" data-testid="email-input" />
        </label>
        <label htmlFor="password">
          Senha
          <input type="password" name="password" data-testid="password-input" />
        </label>
        <button type="submit">Entrar</button>
      </div>
    );
  }
}

export default Login;
