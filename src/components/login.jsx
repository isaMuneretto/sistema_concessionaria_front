// eslint-disable-next-line no-unused-vars
import {React, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormularioLogin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Armazenando o token
            localStorage.setItem('nome', data.nome);
            console.log(data.nome)
            navigate('/home');  // Redireciona para /home
        } else {
            alert('Falha no login!');
        }
    };

    // Estilos CSS para centralizar o formulário completamente
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center', // Centraliza horizontalmente
        alignItems: 'center', // Centraliza verticalmente
        height: '100vh', // Altura total da tela
    };

    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px', // Espaçamento entre os campos do formulário
    };


    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="senha">Senha:</label>
                    <input type="senha" id="senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button type="submit">Entrar</button>
                </form>
                <p>Ainda não tem conta? <Link to="/register">Registre-se</Link></p>
            </div>
        </div>
    );
};

export default FormularioLogin;