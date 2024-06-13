// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home';
import Register from './components/register';
import cadastrar_automoveis from './components/cadastrar_automoveis';
import manutencao_automoveis from './components/manutencao_automoveis';
import cadastrar_funcionario from './components/cadastrar_funcionario';
import PrivateRoute from './components/privateRoute';
import FormularioLogin from './components/login';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" /> } />
                <Route exact path="/login" element={<FormularioLogin/>} />
                <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
                <Route exact path="/register" element={<Register/>} />
                <Route path="/automoveis" element={<cadastrar_automoveis />} />
                <Route path="/manutencao" element={<manutencao_automoveis />} />
                <Route path="/funcionario" element={<cadastrar_funcionario />} />
            </Routes>
        </Router>
    );
};

  
export default App;