import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../Container'
import {HiLogout} from 'react-icons/hi'
import './Navbar.model.css'
import logo from '../../../Assets/goldLogo.png'

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Container customClass="max-width">
          <NavLink className="anchor" to="/home"><img src={logo} alt="Logo gold" /></NavLink>
          <ul className="list">
            <li className='item'>
              <NavLink className="anchor" to="/home">Home</NavLink>
            </li>
            <li className='item'>
              <NavLink className="anchor" to="/amount">Estoque</NavLink>
            </li>
            <li className='item'>
              <NavLink className="anchor" to="/order">Pedido</NavLink>
            </li>
            <li className='item'>
              <NavLink className="anchor" to="/">
                <HiLogout></HiLogout>
              </NavLink>
            </li>
          </ul>
        </Container>
      </nav>
    )
  }
}

export default Navbar