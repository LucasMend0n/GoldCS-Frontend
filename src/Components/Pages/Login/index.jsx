import { useEffect, useRef, useState } from 'react'
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function Login() {

  const auth = useAuth()
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErMsg] = useState('');


  useEffect(() => {
    setErMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await auth.authenticate(user, pwd);
      navigate(from, { replace: true });
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
    }

  }

  return (
    <>
      <section className='LoginPage'>
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
      </section>
    </>
  )
}

export default Login