import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {HiLogout} from 'react-icons/hi'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import './Navbar.model.css'
import logo from '../../../Assets/goldLogo.png'

export class Navbar extends Component {
  render() {

    return (
      <nav className="navbar">
          <NavLink className="anchor" to="/"><img src={logo} alt="Logo gold" /></NavLink>
          <ul className="list">
            <li className='item'>
              <NavLink className="anchor" to="/">Home</NavLink>
            </li>
            <li className='item'>
              <NavLink className="anchor" to="/amount">Estoque</NavLink>
            </li>
            <li className='item'>
              <NavLink className="anchor" to="/order">Pedido</NavLink>
            </li>
            <li className='item'>
              <NavLink className="anchor" to="/newOrder">
                <AiOutlinePlusCircle></AiOutlinePlusCircle>
              </NavLink>
            </li>
            <li className='item'>
              <NavLink className="anchor" to="/login">
                <HiLogout></HiLogout>
              </NavLink>
            </li>
          </ul>
      </nav>
    )
  }
}

export default Navbar