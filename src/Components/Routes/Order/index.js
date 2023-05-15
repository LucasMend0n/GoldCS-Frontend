import React, { Component } from 'react'
import Navbar from '../../Layout/Navbar'
import Container from '../../Layout/Container'
import Footer from '../../Layout/Footer'

export class Order extends Component {
  render() {
    return (
      <>
      <Navbar />
      <Container>
        <h1>Order</h1>
      </Container>
      <Footer />
      </>
    )
  }
}

export default Order