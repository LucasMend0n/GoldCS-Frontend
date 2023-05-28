import React from 'react'
import './Home.css';
import { getUserLocalStorage } from '../../../context/util';


const Home = () => {
  const user = getUserLocalStorage()
  return (
    <section className="HomePage">
      <article>

        <h1>Bem vindo a Gold Colchões, <span>{user.name}</span></h1>
        <button>Novo Pedido</button>

      </article>
    </section>
  )
}

export default Home