import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>TrybeWallet</h1>
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
