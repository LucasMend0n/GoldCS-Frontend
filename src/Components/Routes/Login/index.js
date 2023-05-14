import React from 'react'
import './styles.css'; 

function Login() {
  return (
      <div className='login-container'>
        <section className='form'>
        <form>
        <h1> Gold Colchões </h1>
           <input type='email' placeholder='Email'/>
           <input type='password' placeholder='senha'/>
           <button class="button" type="submit">Login</button>
        </form>

        </section>
    </div>
  )
}

export default Login