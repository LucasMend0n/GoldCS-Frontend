import React from 'react'
import './styles.css'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

export const OrderForm = () => {

  const OrderForm = useForm();
  const { register} = OrderForm

  return (
    <>
      <form className='OrderForm'>
        <h1>Pedido XXXXXXXXX</h1>

        <div className="Form-section">
          <h3>Informações do cliente</h3>

          <label htmlFor="cl-name"> Nome </label>
          <input
            {...register('cl-name')}
            type='text'
            placeholder='Digite o nome do cliente'
            name='cl-name'
            id='cl-name'
          />
          <label htmlFor="cl-id"> CPF </label>
          <input
            {...register('cl-id')}
            type='text'
            placeholder='Digite o CPF do cliente'
            name='cl-id'
            id='cl-id'
          />
          <label htmlFor="cl-email"> Email </label>
          <input
            {...register('cl-email')}
            type='email'
            placeholder='Digite o email do cliente'
            name='cl-email'
            id='cl-email'
          />
          <label htmlFor="cl-celphone"> Telefone celular </label>
          <input
            {...register('cl-celphone')}
            type='text'
            placeholder='Digite o celular do cliente'
            name='cl-celphone'
            id='cl-celphone'
          />
          <label htmlFor="cl-landPhone"> Telefone Fixo </label>
          <input
            {...register('cl-landPhone')}
            type='text'
            placeholder='Digite o telefone fixo do cliente'
            name='cl-landPhone'
            id='cl-landPhone'
          />
        </div>
        <div className="Form-section">
          <h3>Endereço do cliente</h3>
          <label htmlFor="adr-postcode">CEP</label>
          <input
            {...register('adr-postcode')}
            type='text'
            placeholder='Digite o CEP do cliente'
          />
          <label htmlFor="adr-street">Endereço</label>
          <input
            {...register('adr-street')}
            type='text'
            placeholder='Digite o endereço do cliente'
            id='adr-street'
          />
          <label htmlFor="adr-number">Numero</label>
          <input
            {...register('adr-number')}
            type='text'
            placeholder='Digite o número do cliente'
            id='adr-number'
          />
          <label htmlFor="adr-complement">Complemento</label>
          <input
            {...register('adr-complement')}
            type='text'
            placeholder='Digite o complemento do cliente'
            id='adr-complement'
          />
          <label htmlFor="adr-city">Cidade</label>
          <input
            {...register('adr-city')}
            type='text'
            placeholder='Digite a cidade do cliente'
            id='adr-city'
          />
          <label htmlFor="adr-district">Bairro</label>
          <input
            {...register('adr-district')}
            type='text'
            placeholder='Digite o bairro do cliente'
            id='adr-district'
          />
          <label htmlFor="adr-uf">UF</label>
          <input
            {...register('adr-uf')}
            type='text'
            placeholder='Digite o estado do cliente'
            id='adr-uf'
          />
        </div>
        <div className="Form-section">
          <h3>Itens Comprados</h3>
          <table className='purchaseCart'>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Versão</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Colchao</td>
                <td>2m</td>
                <td>
                  <NumericFormat
                    value={'7000'}
                    displayType={'text'}
                    prefix={'R$ '}
                  />
                </td>
                <td>800</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='Form-section'>
          <h3>Dados da compra</h3>
          <label htmlFor="dc-seller">Vendedor</label>
          <input type="text" {...register('dc-seller')} />
          <label htmlFor="od-uptoDate">Data de entrega prevista</label>
          <input type="date" {...register('od-uptoDate')} />
          <label htmlFor="od-payment">Forma de pagamento</label>
          <input type='text' placeholder='Forma de pagamento' {...register('od-payment')} />
        </div>
        <button>Enviar por email</button>
      </form>
    </>
  )
}