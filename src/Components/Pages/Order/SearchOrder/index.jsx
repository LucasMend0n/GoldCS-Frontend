import React from 'react'
import './styles.css'
import { useForm } from 'react-hook-form'

const SearchOrder = () => {

    const SearchForm = useForm()
    const { register} = SearchForm

  return (
    <>
    <form className='searchForm' >
        <h1>Encontrar pedido</h1>
        <input placeholder='Buscar Pedido...' type="search" {...register('search')}  />
    </form>
    </>
  )
}

export default SearchOrder