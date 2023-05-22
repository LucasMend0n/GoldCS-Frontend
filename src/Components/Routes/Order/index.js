import React, { Component } from 'react'
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'
import OrderForm from './OrderForm'
import SearchOrder from './SearchOrder'

export class Order extends Component {
  render() {
    return (
      <>
        <Navbar />
        <SearchOrder />
        <OrderForm />
        <Footer />
      </>
    )
  }
}

export default Order