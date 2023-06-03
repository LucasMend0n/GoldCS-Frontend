import React, { useState } from 'react'
import './styles.css'
import apiGold from '../../../../Services/api'
import OrderForm from '../OrderForm'

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

  return (
    <>
      <form className='searchForm' >
        <h1>Encontrar pedido</h1>
        <input
          type="text"
          placeholder='Buscar Pedido...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </form>

      {
        error ? (<p>Nenhum pedido encontrado com esse Id</p>)
          : (order ? <OrderForm order={order} /> : null)
      }
    </>
  )
}

export default SearchOrder