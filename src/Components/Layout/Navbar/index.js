import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    return (
        <ul>
            <Link to="/">Home</Link>
            <Link to="/amount">Estoque</Link>
            <Link to="/product">Produto</Link>
            <Link to="/order">Pedido</Link>
        </ul>
    )
  }
}

export default Navbar