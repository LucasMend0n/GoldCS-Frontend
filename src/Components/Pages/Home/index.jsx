import React from 'react'
import './Home.css';
import { getUserLocalStorage } from '../../../context/util';
import { Link } from 'react-router-dom';


const Home = () => {
  const user = getUserLocalStorage()
  return (
    <section className="HomePage">
      <article>

        <h1>Bem vindo a Gold Colchões, <span>{user.name}</span></h1>
        <Link to={'/newOrder'}>
          <button>Novo Pedido</button>
        </Link>

      </article>
    </section>
  )
}

export default Home