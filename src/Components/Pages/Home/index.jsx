import React from 'react'
import './Home.css';
import { getUserLocalStorage } from '../../../context/util';
import { Link, NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'
import { BsFillBoxSeamFill, BsFillArchiveFill } from 'react-icons/bs'
import { BiNotepad } from 'react-icons/bi'


const Home = () => {
  const user = getUserLocalStorage()
  return (
    <section className="HomePage">
      <div className='display-user'>Bem vindo, {user.name}</div>
      <div className='home_buttons'>
        <NavLink id='order' className={'btn-global btn-home'} to={'/order'}>
          <BiNotepad />
          Pedido
        </NavLink>
        <NavLink className={'btn-global btn-home'} to={'/product'}>
          <BsFillBoxSeamFill />
          Produto
        </NavLink>
        <NavLink className={'btn-global btn-home'} to={'/amount'}>
          <BsFillArchiveFill />
          Estoque
        </NavLink>
        <NavLink className={'btn-global btn-home'} to={'/profile'}>
          <AiOutlineUser />
          Perfil
        </NavLink>
      </div>
      <article>
        <Link to={'/newOrder'}>
          <button>Novo Pedido</button>
        </Link>

      </article>
    </section>
  )
}

export default Home