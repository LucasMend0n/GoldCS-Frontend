import React from 'react'
import './styles.css'; 
import { UIButton } from '../../Layout/UIButton/UIButton';
import { Link } from 'react-router-dom';

function Login() {
  return (
      <div className='login-container'>
        <section className='form'>
        <form>
        <h1> Gold Colchões </h1>
           <UIButton 
           component={Link}
           to='/home'
           className='login-button button'>Login</UIButton>
        </form>

        </section>
    </div>
  )
}

export default Login