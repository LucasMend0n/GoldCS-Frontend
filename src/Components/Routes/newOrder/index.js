import React from 'react'
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'
import NewOrderForm from './newOrderForm/newOrderForm'

function NewOrder() {
  return (
    <>
      <Navbar />
        <NewOrderForm />
      <Footer/>
    </>
  )
}

export default NewOrder