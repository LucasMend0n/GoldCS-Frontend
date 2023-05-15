import React from 'react'
import './styles.css';
import { Link } from 'react-router-dom';
import { UIButton } from '../../Layout/UIButton/UIButton';
import Container from '../../Layout/Container';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Container customClass='min-height'>
        <section className='home_container'>
          <h1>Bem vindo ao GoldCS, Lucas Mendonça!</h1>
          <UIButton
            component={Link}
            to='/newOrder'
            className='home_button'>Novo pedido
          </UIButton>
        </section>
      </Container>
      <Footer/>
    </>
  )
}

export default Home