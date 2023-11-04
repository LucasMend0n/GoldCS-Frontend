import { Form } from 'react-bootstrap'
import './NewProduct.css'
const NewProduct = () => {
  return (
    <section className='NewProductPage d-flex flex-column justify-content-start align-items-center'>
      <div className='display-user'><h2>Produto</h2></div>
      
      <form className="newProductForm d-flex flex-column justify-content-center my-5 p-5">
        <h1 className="mb-4">Novo Produto</h1>
        <div className="">
          <Form.Group className="d-flex flex-column px-2 mb-4">
            <label htmlFor="adr-postcode">Nome do produto</label>
            <Form.Control
            />
          </Form.Group>
          <Form.Group className="d-flex flex-column px-2 mb-4">
            <label htmlFor="adr-postcode">Nome do produto</label>
            <Form.Control
            />
          </Form.Group>
          <div className='className="form_line d-flex mb-4 '>
            <Form.Group className="d-flex flex-column px-2 w-25">
              <label htmlFor="adr-postcode">Nome do produto</label>
              <Form.Control
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column w-75 px-2">
              <label htmlFor="adr-postcode">Nome do produto</label>
              <Form.Select

              >
              <option value={""}>Selecione a forma de pagamento...</option>
              <option value={""}>Selecione a forma de pagamento...</option>
              <option value={""}>Selecione a forma de pagamento...</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </form>

    </section>
  )
}

export default NewProduct