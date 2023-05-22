import React, { useEffect, useRef, useState } from 'react'
import './styles.css';
import { Link } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai'

const USER_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErMsg] = useState('');
  //const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);

    setValidPwd(result);
  }, [pwd])

  useEffect(() => {
    setErMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "ofscreen"}>{errMsg}</p>

      <form className='LoginForm' onSubmit={handleSubmit}>
        <h1>Bem vindo ao <span>GoldCS</span></h1>
        <div className="form_control">
          <label htmlFor="login_username">
            Usuário <span />
            <AiOutlineCheck className={validName ? "valid" : "hide"} />
          </label>
          <input
            type='text'
            id='login_username'
            placeholder='Insira seu email'
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "ofscreen"}>10 a 20 letras <br /> Precisa começar com uma letra <br /> Letras, numeros, caracteres especiais permitidos </p>

        </div>
        <div className="form_control">
          <label htmlFor="login_password">
            Senha <span />
            <AiOutlineCheck className={validPwd ? "valid" : "hide"} />
          </label>
          <input
            type='password'
            id='login_password'
            placeholder='Insira sua senha'
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p id='pwdnote' className={pwdFocus && pwd && !validPwd ? "instructions" : "ofscreen"}>
            8 a 24 caracteres <br /> Precisa incluir letras maiúsculas e minúsculas, um número e um caracter especial <br />
          </p>
        </div>
        <div className="form_control">
          <button disabled={!validName || !validPwd ? true : false} >
            Entrar
          </button>
        </div>
      </form>
      <p>
        Novo por aqui?
        <span className="line">
          {/*put router link here*/}
          <Link> Cadastre-se</Link>
        </span>
      </p>
      <Link to='/home'>TESTE</Link>

    </section>

  )
}

export default Login