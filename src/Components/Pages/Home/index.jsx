import React from 'react'
import './Home.css';
import { getUserLocalStorage } from '../../../context/util';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillBoxSeamFill, BsFillArchiveFill, BsFillFileTextFill } from 'react-icons/bs'


const Home = () => {
  const user = getUserLocalStorage()
  return (
    <section className="HomePage">
      <div className='display-user'>Bem vindo, {user.name}</div>
      <article className='buttons_section'>
        <div className='home_buttons'>
          <NavLink id='order' className={'btn-global btn-home'} to={'/order'}>
            <BsFillFileTextFill />
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

      </article>
    </section>
  )
}

export default Home