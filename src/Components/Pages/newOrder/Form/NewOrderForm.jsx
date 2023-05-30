import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import './Form.css'
import RDialog from './Dialog'
import { useRef } from 'react'

const NewOrderForm = () => {

  const form = useForm()
  const { register, control, setValue, setFocus } = form
  
  const formRef = useRef(null)

  const checkCEP = (e) => {
    const cep = formRef.current['adr-postcode'].value.replace(/\D/g, '');
    
    if(!cep) return; 

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json()).then(data => {
        setValue('adr-street', data.logradouro)
        setValue('adr-district', data.bairro)
        setValue('adr-city', data.localidade)
        setValue('adr-uf', data.uf)
        setFocus('adr-number')
      });
  };

  return (
    <>
      <form ref={formRef}>
        <h1>Novo Pedido</h1>

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
            id='adr-postcode'
            onBlur={checkCEP}
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
          <h3>Produtos escolhidos</h3>
          <RDialog />
        </div>
        <div className="Form-section">
          <h3>Informações do pedido</h3>
        </div>
        <button>Enviar</button>
      </form>
      <DevTool control={control} />
    </>
  )
}

export default NewOrderForm