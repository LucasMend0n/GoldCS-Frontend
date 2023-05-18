import React from 'react'
import './styles.css';
import LoginForm from './LoginForm/LoginForm';

function Login() {
  return (
    <div className='login-container'>
      <div className="container">
        <h1>Bem vindo ao <span>GoldCS</span></h1>
        <p>Entre ou cadastre-se</p>
        <LoginForm btnTxt=""></LoginForm>
      </div>
    </div>
  )
}

export default Login