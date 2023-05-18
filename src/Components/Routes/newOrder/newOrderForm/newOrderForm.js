import React from 'react'
import Input from '../../../Layout/FormFields/Input'
import styles from './newOrderForm.module.css'
import SubmitButton from '../../../Layout/FormFields/SubmitButton'

function NewOrderForm() {
  return (
    <div className={styles.form_container}>
      <form className={styles.form} >
        <h1>Novo Pedido</h1>
        <h2>Dados do cliente</h2>
        <Input text="CPF" type="text" name="cpf" placeholder="Digite o CPF do cliente"/>
        <Input text="Nome" type="text" name="nome" placeholder="Digite o nome do cliente"/>
        <div>
          <h2>Dados do endereço</h2>
          <Input text="CEP" name="cep" placeholder="Digite o CEP do cliente"/>
          <Input text="Endereço" name="endereco" placeholder="Digite endereço do cliente"/>
          <Input text="Bairro" name="bairro" placeholder="Digite o bairro do cliente"/>
          <Input text="UF" name="uf" placeholder="Digite a UF do cliente"/>
          <Input text="Numero" name="numero" placeholder="Digite o numero do cliente"/>
          <Input text="Complemento" name="comp" placeholder="Digite o complemento do cliente"/>
        </div>
        <div>
          <h2>Dados do produto</h2>
          <Input text="ID do produto" name = "id" placeholder="Digite o ID do produto" />
          <Input text="Quantidade" name = "qtd" placeholder="Digite a quantidade do produto" />
        </div>
        <div>
          <h2>Finalização do Pedido</h2>
          <Input text="Preço final: " type="number" placeholder="Digite o preço final do pedido" name="subtotal">  </Input>
        </div>
        <div>
          <SubmitButton text="Enviar novo pedido"></SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default NewOrderForm