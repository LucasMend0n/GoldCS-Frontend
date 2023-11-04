import { useState } from 'react';
import './ListProducts.css'
import { Form } from 'react-bootstrap'

const ListProducts = () => {

  return (
    <section className='searchProductPage d-flex flex-column justify-content-start align-items-center'>
      <div className="display-user">
        <h1>Encontrar pedido</h1>
      </div>
      <div className='searchProduct w-25 d-flex justify-content-center' >
        <Form.Control
          type="text"
          placeholder='Buscar produto...'
        />
        <button className='btn-global'>
          Buscar
        </button>
      </div>

      <div className='productsTable'>

      </div>
    </section>
  );
}

export default ListProducts;
