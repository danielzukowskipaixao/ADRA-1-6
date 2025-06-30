import React from 'react';
import './login.css';

const Login = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Digite seu email" required />

          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" placeholder="Digite sua senha" required />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
