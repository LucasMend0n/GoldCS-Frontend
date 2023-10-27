import './newOrder.css'
import NewOrderForm from './Form/NewOrderForm'
const NewOrder = () => {



  return (
    <section className='NewOrderPage d-flex flex-column justify-content-start align-items-center'>
      <div className='display-page'><h2>Pedido</h2></div>

      <NewOrderForm />
    </section>
  )
}

export default NewOrder


