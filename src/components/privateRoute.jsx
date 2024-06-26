import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;













/* import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(false);

    const login = () => {
        setAutenticado(true);
    };

    const logout = () => {
        setAutenticado(false);
    };

    return (
        <AuthContext.Provider value={{ autenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}; */