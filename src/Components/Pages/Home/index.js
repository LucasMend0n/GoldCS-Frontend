import React from 'react'
import './Home.css';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

function Home() {
  return (
    <>
      <Navbar />   
        <section className='A'>
          <h1>Bem vindo ao GoldCS, Lucas Mendonça!</h1>
        </section>
      <Footer/>
    </>
  )
}

export default Home