import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section className="formImg">
          <WalletForm />
          <img
            className="pig"
            src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-cofrinho_114360-5612.jpg?w=826&t=st=1662147106~exp=1662147706~hmac=2d93d68d87221e27e9affb0cb104a70a31670463bece70101f507325218b03bc"
            //href="https://br.freepik.com/vetores-gratis/ilustracao-do-conceito-de-cofrinho_13416121.htm#query=pig%20money&position=14&from_view=search"
            alt="not found"
          />
        </section>
        <Table />

      </div>
    );
  }
}

export default Wallet;
