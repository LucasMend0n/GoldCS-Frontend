import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from '../Container'
import './Navbar.model.css'
import logo from '../../../Assets/goldLogo.png'

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Container customClass="max-width">
          <Link to="/"><img src={logo} alt="Logo gold" /></Link>
          <ul className="list">
            <li className='item'>
              <Link to="/">Home</Link>
            </li>
            <li className='item'>
              <Link to="/amount">Estoque</Link>
            </li>
            <li className='item'>
              <Link to="/product">Produto</Link>
            </li>
            <li className='item'>
              <Link to="/order">Pedido</Link>
            </li>
          </ul>
        </Container>
      </nav>
    )
  }
}

export default Navbar