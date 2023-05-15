import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from '../Container'
import {HiLogout} from 'react-icons/hi'
import './Navbar.model.css'
import logo from '../../../Assets/goldLogo.png'

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Container customClass="max-width">
          <Link to="/home"><img src={logo} alt="Logo gold" /></Link>
          <ul className="list">
            <li className='item'>
              <Link to="/home">Home</Link>
            </li>
            <li className='item'>
              <Link to="/amount">Estoque</Link>
            </li>
            <li className='item'>
              <Link to="/order">Pedido</Link>
            </li>
            <li className='item'>
              <Link to="/">
                <HiLogout></HiLogout>
              </Link>
            </li>
          </ul>
        </Container>
      </nav>
    )
  }
}

export default Navbar