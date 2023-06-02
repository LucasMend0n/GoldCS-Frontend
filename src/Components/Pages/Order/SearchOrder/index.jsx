import React, { useState } from 'react'
import './styles.css'
import apiGold from '../../../../Services/api'
import OrderForm from '../OrderForm'

const SearchOrder = () => {

  const [search, setSearch] = useState('')
  const [order, setOrder] = useState(null)


  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await apiGold.get(`Order/${search}`);

      if (response.data.success) {
        const foundOrder = response.data.result
        setOrder(foundOrder)
        console.log(foundOrder)
        setSearch('')
      }
      else {
        console.log('sem sucesso', response.data)
      }
    } catch (error) {
      console.log(error)
      setOrder(null)
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

      {order ? (
        <OrderForm order={order} />
      ) : <p>Nenhum pedido encontrado</p>
      }
    </>
  )
}

export default SearchOrder