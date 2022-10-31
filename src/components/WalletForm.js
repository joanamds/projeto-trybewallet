import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <>
        <form>
          Formulário de despesa
        </form>
        <label htmlFor="expense-value">
          Valor da despesa:
          <input
            name="expense-value"
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="expense-description">
          Descrição da despesa:
          <input
            name="expense-description"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda da despesa
          <select data-testid="currency-input" name="currency">
            <option>Currency 1</option>
            {/* terei que fazer a requisição da API para ter acesso as moedas que serão como opção, farei um map ou foreach para criar um select para cada moeda do array currencies atualizado no state através da action walletForm */}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select data-testid="method-input" name="method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Método de pagamento:
          <select data-testid="tag-input" name="category">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

export default WalletForm;
