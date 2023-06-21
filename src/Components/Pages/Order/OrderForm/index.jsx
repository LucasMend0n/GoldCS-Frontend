import './styles.css'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { format } from 'date-fns'

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
      <form className='OrderForm'>
        <h1>Pedido {order.orderID}</h1>

        <div className='Form-section'>
          <h3>Dados da compra</h3>
          <label htmlFor="dcseller">Vendedor</label>
          <input type="text" {...register('dcseller')} disabled />
          <label htmlFor="odOrderDate">Data que o Pedido foi realizado</label>
          <input type="text" {...register('odOrderDate')} disabled />
          <label htmlFor="odSendDate">Data de entrega prevista</label>
          <input type="text" {...register('odSendDate')} disabled />
          <label htmlFor="odPaymentt">Forma de pagamento</label>
          <input type='text' placeholder='Forma de pagamento' disabled {...register('odPayment')} />
        </div>

        <div className="Form-section">
          <h3>Informações do cliente</h3>

          <label htmlFor="clientName"> Nome </label>
          <input
            disabled
            {...register('clientName')}
            type='text'
            placeholder='Digite o nome do cliente'
          />
          <label htmlFor="clientID"> CPF </label>
          <input
            disabled
            {...register('clientID')}
            type='text'
            placeholder='Digite o CPF do cliente'

          />
          <label htmlFor="clientEmail"> Email </label>
          <input
            disabled
            {...register('clientEmail')}
            type='email'
            placeholder='Digite o email do cliente'
          />
          <label htmlFor="clientCelphone"> Telefone celular </label>
          <input
            disabled
            {...register('clientCelphone')}
            type='text'
            placeholder='Digite o celular do cliente'
          />
          <label htmlFor="clientLandphone"> Telefone Fixo </label>
          <input
            disabled
            {...register('clientLandphone')}
            type='text'
            placeholder='Digite o telefone fixo do cliente'
          />
        </div>
        <div className="Form-section">
          <h3>Endereço do cliente</h3>
          <label htmlFor="adressCep">CEP</label>
          <input
            disabled
            {...register('adressCep')}
            type='text'
            placeholder='Digite o CEP do cliente'
          />
          <label htmlFor="adressStreet">Endereço</label>
          <input
            disabled
            {...register('adressStreet')}
            type='text'
            placeholder='Digite o endereço do cliente'
          />
          <label htmlFor="adressNumber">Numero</label>
          <input
            disabled
            {...register('adressNumber')}
            type='text'
            placeholder='Digite o número do cliente'
          />
          <label htmlFor="adressComplement">Complemento</label>
          <input
            disabled
            {...register('adressComplement')}
            type='text'
            placeholder='Digite o complemento do cliente'
          />
          <label htmlFor="adressCity">Cidade</label>
          <input
            disabled
            {...register('adressCity')}
            type='text'
            placeholder='Digite a cidade do cliente'
          />
          <label htmlFor="adressDistrict">Bairro</label>
          <input
            disabled
            {...register('adressDistrict')}
            type='text'
            placeholder='Digite o bairro do cliente'
          />
          <label htmlFor="adressUF">UF</label>
          <input
            disabled
            {...register('adressUF')}
            type='text'
            placeholder='Digite o estado do cliente'
          />
        </div>
        <div className="Form-section">
          <h3>Itens Comprados</h3>

          <table className='orderProductsTable'>
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
        <h3> Total do pedido:  <NumericFormat value={order.total} allowNegative={false} fixedDecimalScale decimalScale={2} displayType={'text'} prefix={'R$ '} />
        </h3>

      </form>
    </>
  )
}

export default OrderForm