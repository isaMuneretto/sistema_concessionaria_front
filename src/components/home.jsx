// eslint-disable-next-line no-unused-vars
import React from 'react';
import MenuSuperior from './MenuSuperior';


const Home = () => {
  return (
    <div>
      <MenuSuperior />
      <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center mt-5 ">
        <h1>Página inicial</h1>
        <p>Você está logado!</p>
      </div>
    </div>
    </div>
  );
};

export default Home;