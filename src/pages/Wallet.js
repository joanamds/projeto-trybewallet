import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import TableContent from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <TableContent />
      </div>
    );
  }
}

export default Wallet;
