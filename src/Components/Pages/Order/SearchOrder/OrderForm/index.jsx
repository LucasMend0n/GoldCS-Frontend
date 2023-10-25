import './styles.css'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { format } from 'date-fns'
import { Form } from 'react-bootstrap'

const OrderForm = ({ order }) => {

  const formatedDeliveryDate = format(new Date(order.deliveryForecast), 'dd/MM/yyyy')
  const formatedOrderDate = format(new Date(order.orderDate), 'dd/MM/yyyy')

  const OrderForm = useForm({
    defaultValues: {
      dcseller: order.userName,
      odSendDate: formatedDeliveryDate,
      odOrderDate: formatedOrderDate,
      odPayment: order.paymentMethod,
      clientName: order.client.name,
      clientID: order.client.cpf,
      clientEmail: order.client.email,
      clientCelphone: order.client.cellPhone,
      clientLandphone: order.client.landlinePhone,
      adressCep: order.address.cep,
      adressStreet: order.address.addressName,
      adressNumber: order.address.number,
      adressComplement: order.address.complement,
      adressCity: order.address.city,
      adressDistrict: order.address.district,
      adressUF: order.address.uf

    }
  });
  const { register } = OrderForm

  return (
    <>
      <form className='OrderForm d-flex flex-column justify-content-center my-5 p-5'>
        <h1 className='mb-4'>Pedido {order.orderID}</h1>
        <div className='form_section_horizontal  d-flex flex-column '>
          <h3 className="w-100 border-bottom mb-3 pb-3">Dados da compra</h3>
          <div className="form_line justif d-flex mb-4">
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="dcseller">Vendedor</label>
              <Form.Control type="text" {...register('dcseller')} disabled />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="odOrderDate">Data que o Pedido foi realizado</label>
              <Form.Control type="text" {...register('odOrderDate')} disabled />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="odSendDate">Data de entrega prevista</label>
              <Form.Control type="text" {...register('odSendDate')} disabled />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="odPaymentt">Forma de pagamento</label>
              <Form.Control type='text' disabled {...register('odPayment')} />
            </Form.Group>
          </div>
        </div>

        <div className="form_section_horizontal d-flex flex-column ">
          <h3 className='w-100 border-bottom mb-3 pb-3'>Informações do cliente</h3>
          <div className="form_line justif d-flex mb-4">
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="clientName"> Nome </label>
              <Form.Control
                disabled
                {...register('clientName')}
                type='text'

              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="clientID"> CPF </label>
              <Form.Control
                disabled
                {...register('clientID')}
                type='text'

              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="clientEmail"> Email </label>
              <Form.Control
                disabled
                {...register('clientEmail')}
                type='email'
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="clientCelphone"> Telefone celular </label>
              <Form.Control
                disabled
                {...register('clientCelphone')}
                type='text'
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="clientLandphone"> Telefone Fixo </label>
              <Form.Control
                disabled
                {...register('clientLandphone')}
                type='text'
              />
            </Form.Group>
          </div>
        </div>
        <div className="form_section_horizontal  d-flex flex-column ">
          <h3 className='w-100 border-bottom mb-3 pb-3'>Endereço do cliente</h3>
          <div className="form_line justif d-flex mb-4">
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adressCep">CEP</label>
              <Form.Control
                disabled
                {...register('adressCep')}
                type='text'
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adressStreet">Endereço</label>
              <Form.Control
                disabled
                {...register('adressStreet')}
                type='text'
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adressNumber">Numero</label>
              <Form.Control
                disabled
                {...register('adressNumber')}
                type='text'
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adressComplement">Complemento</label>
              <Form.Control
                disabled
                {...register('adressComplement')}
                type='text'

              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adressCity">Cidade</label>
              <Form.Control
                disabled
                {...register('adressCity')}
                type='text'
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adressDistrict">Bairro</label>
              <Form.Control
                disabled
                {...register('adressDistrict')}
                type='text'
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column px-2">
              <label htmlFor="adressUF">UF</label>
              <Form.Control
                disabled
                {...register('adressUF')}
                type='text'
              />
            </Form.Group>
          </div>
        </div>
        <div className="form_section_horizontal  d-flex flex-column ">
          <h3>Itens Comprados</h3>
          <div className="form_table_line d-flex justify-content-center align-items-center p-3 mb-4 ">
            <table className='orderProductsTable className="p-3 my-3'>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderProducts.map((item) => (
                  <tr key={item.productID}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <NumericFormat value={item.finalPrice} allowNegative={false} fixedDecimalScale decimalScale={2} displayType={'text'} prefix={'R$ '} />
                    </td>
                    <td>
                      <NumericFormat value={item.finalPrice * item.quantity} allowNegative={false} fixedDecimalScale decimalScale={2} displayType={'text'} prefix={'R$ '} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <h3>
          Total do pedido:  <NumericFormat value={order.total} allowNegative={false} fixedDecimalScale decimalScale={2} displayType={'text'} prefix={'R$ '} />
        </h3>

      </form>
    </>
  )
}

export default OrderForm