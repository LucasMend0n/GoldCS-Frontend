import './product.css'
import { NavLink } from 'react-router-dom'
import { FaListAlt } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'


const Product = () => {
  return (
    <section className='ProductPage d-flex flex-column justify-content-start align-items-center'>
      <div className='display-user'><h2>Produto</h2></div>
      <article className='buttons_section'>
        <div className='product_buttons'>
          <NavLink id='new_product' className={'btn-global btn-home d-flex flex-column justify-content-start align-items-center p-5'} to={'/newproduct'}>
            <AiOutlinePlus />
            Adicionar Produto
          </NavLink>
          <NavLink id='list_product' className={'btn-global  btn-home d-flex flex-column justify-content-start align-items-center p-5'} to={'/listproducts'}>
            <FaListAlt />
            Lista de Produtos
          </NavLink>
        </div>
      </article>
    </section>
  )

}

export default Product