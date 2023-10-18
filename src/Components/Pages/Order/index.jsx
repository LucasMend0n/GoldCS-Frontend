import { NavLink } from 'react-router-dom'
import './Order.css'
import { FaShoppingCart } from 'react-icons/fa'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const Order = () => {
  return (
    <section className='OrderPage d-flex flex-column justify-content-start align-items-center'>
      <div className='display-page'><h2>Pedido</h2></div>

      <article className='buttons_section'>
        <div className='order_buttons'>
          <NavLink id='order' className={'btn-global btn-home d-flex flex-column justify-content-start align-items-center p-5'} to={'/newOrder'}>
            <FaShoppingCart />
            NOVO PEDIDO
          </NavLink>
          <NavLink id='search_order' className={'btn-global  btn-home d-flex flex-column justify-content-start align-items-center p-5'} to={'/'}>
            <HiMagnifyingGlass />
            BUSCAR PEDIDO
          </NavLink>
        </div>

      </article>

    </section>
  )
}

export default Order