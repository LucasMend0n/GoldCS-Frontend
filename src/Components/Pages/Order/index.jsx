import React from 'react'
import {OrderForm} from './OrderForm'
import SearchOrder from './SearchOrder'
import './Order.css'

const Order = () => {
  return (
    <section className='OrderPage'>
      <SearchOrder/>
      <OrderForm />
    </section>
  )
}

export default Order