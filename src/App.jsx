// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home';
import Cadastrar_Automovel from './components/cadastrar_automovel';
import Manutencao_Automoveis from './components/manutencao_automoveis';
import Cadastrar_Funcionario from './components/cadastrar_funcionario';
import PrivateRoute from './components/privateRoute';
import FormularioLogin from './components/login';
import MenuSuperior from './components/MenuSuperior';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" /> } />
                <Route exact path="/login" element={<FormularioLogin/>} />
                <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
                <Route path="/automoveis" element={ <> <MenuSuperior /><Cadastrar_Automovel /> </>} />
                <Route path="/manutencao" element={<> <MenuSuperior /><Manutencao_Automoveis /></>} />
                <Route path="/funcionario" element={<> <MenuSuperior /><Cadastrar_Funcionario /></>} />
            </Routes>
        </Router>
    );
};

  
export default App;