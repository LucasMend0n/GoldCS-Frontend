import React from 'react'
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'
import NewOrderForm from './newOrderForm/newOrderForm'
import Container from '../../Layout/Container'

function NewOrder() {
  return (
    <>
      <Navbar />
      <Container customClass="center">
        <NewOrderForm />
      </Container>
      <Footer/>
    </>
  )
}

export default NewOrder