import React, { useState } from 'react'
import Input from '../../../Layout/FormFields/Input'
import styles from './newOrderForm.module.css'
import SubmitButton from '../../../Layout/FormFields/SubmitButton'
import Select from '../../../Layout/FormFields/Select';

function NewOrderForm() {

  const options = [
    { value: 'Cama', label: 'Cama' },
    { value: 'box', label: 'Box' },
    { label: 'Cabeceira', value: 'cabeceira' },
  ];

  const [value, setValue] = useState('Objeto')
  const handleChange = (event) => {
    setValue(event.target.value,)
  }

  return (
    <div className={styles.form_container}>

      <form className={styles.form} >
        <h1>Novo Pedido </h1>
        <div className={styles.fieldset}>
          <h2>Dados do cliente</h2>
          <Input text="Nome" type="text" name="nome" placeholder="Digite o nome do cliente" />
          <Input text="CPF" type="text" name="cpf" placeholder="Digite o CPF do cliente" />
          <Input text="Email" type="text" name="email" placeholder="Digite o email do cliente" />
          <Input text="Celular" type="text" name="celphone" placeholder="Digite o celular do cliente" />
          <Input text="Telefone Residencial" type="text" name="phoneNumber" placeholder="Digite o celular do cliente" />
        </div>
        <div className={styles.fieldset}>
          <h2>Dados do endereço</h2>
          <Input text="CEP" type="text" name="cep" placeholder="Digite o CEP do cliente" />
          <Input text="Endereço" type="text" name="endereco" placeholder="Digite endereço do cliente" />
          <Input text="Bairro" type="text" name="bairro" placeholder="Digite o bairro do cliente" />
          <Input text="UF" type="text" name="uf" placeholder="Digite a UF do cliente" />
          <Input text="Numero" type="text" name="numero" placeholder="Digite o numero do cliente" />
          <Input text="Complemento" type="text" name="comp" placeholder="Digite o complemento do cliente" />
        </div>
        <div className={styles.fieldset}>
          <h2>Dados do produto</h2>
          <Select label="Produto"
            options={options}
            value={value}
            onChange={handleChange}
          />
          <Input text="Quantidade" name="qtd" placeholder="Digite a quantidade do produto" />
          <Input text="Preço final: " type="number" placeholder="Digite o preço final do pedido" name="subtotal">  </Input>
          <div className="actions">
            <SubmitButton text="Adicionar produto" />
          </div>
        </div>
        <div className={styles.fieldset}>
          <h2>Dados do Pedido</h2>
          <Input text="Data de entrega" type="date" name="forecastDate" placeholder="Digite a data de entrega prevista" />
          <Input text="Meio de pagamento" type="text" name="paymentMethod" placeholder="Insira o método de pagamento escolhido" />
        </div>
        <div className={styles.actions}>
          <SubmitButton text="Enviar novo pedido"></SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default NewOrderForm