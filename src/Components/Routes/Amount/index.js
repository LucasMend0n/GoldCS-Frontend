import React, { Component } from 'react'
import Navbar from '../../Layout/Navbar'
import Container from '../../Layout/Container'
import Footer from '../../Layout/Footer'

export class Amount extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <Container>
          <h1>Amount</h1>
        </Container>
        <Footer/>
      </>
    )
  }
}

export default Amount