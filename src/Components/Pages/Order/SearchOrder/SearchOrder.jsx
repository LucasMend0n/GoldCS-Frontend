import React, { useState } from 'react'
import './SearchOrder.css'
import apiGold from '../../../../Services/api'
import OrderForm from './OrderForm'
import { Form } from 'react-bootstrap'

const SearchOrder = () => {

  const [search, setSearch] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(false);


  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await apiGold.get(`Order/${search}`);

      if (response.data.success) {
        const foundOrder = response.data.result
        setOrder(foundOrder)
        setSearch('')
        setError(false)
      }
      else {
        setError(true)
      }
    } catch (error) {
      setOrder(null)
      setError(true)
    }
  }
  const deleteOrder = (e) => {
    e.preventDefault();
    setSearch('')
    setError(false)
    setOrder(null)
  }

  return (
    <>
      <section className='searchOrderPage d-flex flex-column justify-content-start align-items-center'>
        <div className="display-page">
          <h1>Encontrar pedido</h1>
        </div>
        <form className='searchForm d-flex' >
          <Form.Control
            type="text"
            placeholder='Buscar Pedido...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="search_buttons d-flex ">
            <button id='yellow_button' className='btn-global' onClick={handleSearch}>Buscar</button>
            <button id='yellow_button' className='btn-global' onClick={deleteOrder}>Limpar</button>
          </div>
        </form>

        {
          error ? (<p>Nenhum pedido encontrado com esse Id</p>) : (order ? <OrderForm order={order} /> : null)
        }
      </section>
    </>
  )
}

export default SearchOrder