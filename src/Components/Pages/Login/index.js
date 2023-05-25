import React, { useEffect, useRef, useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import apiGold from '../../../Services/api'
const login_URL = '/Authenticate/LoginUser'

function Login() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resp = await apiGold.post(login_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
        }

      );
      console.log(JSON.stringify(resp?.data))
      setUser('')
      setPwd('')
      setSuccess(true)
    }
    catch (err) {

      if (!err?.response) {
        setErMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErMsg('Unauthorized');
      } else {
        setErMsg('Login Failed');
      }
      errRef.current.focus();

    }

  }

  return (
    <>
      {success ? (
        <section>
          <h1>Logado</h1>
          <br />
          <p>
            <Link to='/home'>TESTE</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "ofscreen"}>{errMsg}</p>

          <form className='LoginForm' onSubmit={handleSubmit}>
            <h1>Bem vindo ao <span>GoldCS</span></h1>
            <div className="form_control">
              <label htmlFor="login_username">
                Usuário
              </label>
              <input
                type='email'
                id='login_username'
                placeholder='Insira seu email'
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>

            <div className="form_control">
              <label htmlFor="login_password">
                Senha
              </label>
              <input
                type='password'
                id='login_password'
                placeholder='Insira sua senha'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </div>

            <div className="form_control">
              <button>
                Entrar
              </button>
            </div>
          </form>
          <Link to='/home'>TESTE</Link>

        </section>
      )}
    </>
  )
}

export default Login