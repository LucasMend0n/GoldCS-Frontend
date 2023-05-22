import React from 'react'
import Input from '../../Layout/FormFields/Input'
import styles from './OrderForm.module.css'

function OrderForm() {
  return (

    <div className={styles.form_container}>
      <form className={styles.form} >
        <h1> PEDIDO: XXXXXXX </h1>
        <div className={styles.fieldset}>
          <h2>Dados do cliente</h2>
          <Input text="Nome" type="text" name="nome" placeholder="Digite o nome do cliente" value="XXXXXXXXXXXXXX" />
          <Input text="CPF" type="text" name="cpf" placeholder="Digite o CPF do cliente" value="XXXXXXXXXXXXXX" />
          <Input text="Email" type="text" name="email" placeholder="Digite o email do cliente" value="XXXXXXXXXXXXXX" />
          <Input text="Celular" type="text" name="celphone" placeholder="Digite o celular do cliente" value="XXXXXXXXXXXXXX" />
          <Input text="Telefone Residencial" type="text" name="phoneNumber" placeholder="Digite o celular do cliente" value="XXXXXXXXXXXXXX" />
        </div>
        <div className={styles.fieldset}>
          <h2>Dados do endereço</h2>
          <Input text="CEP" name="cep" value="XXXXXXXXXXXXXX" />
          <Input text="Endereço" name="endereco" value="XXXXXXXXXXXXXX" />
          <Input text="Bairro" name="bairro" value="XXXXXXXXXXXXXX" />
          <Input text="UF" name="uf" value="XXXXXXXXXXXXXX" />
          <Input text="Numero" name="numero" value="XXXXXXXXXXXXXX" />
          <Input text="Complemento" name="comp" value="XXXXXXXXXXXXXX" />

        </div>
        <div className={styles.fieldset}>
          <h2>Dados do produto</h2>
          <Input text="Produto" name="id" value="XXXXXXXXXXXXXX" />
          <Input text="Quantidade" name="qtd" value="XXXXXXXXXXXXXX" />
        </div>
        <div className={styles.fieldset}>
          <h2>Finalização do Pedido</h2>
          <Input text="Preço final: " type="number" value="0000.00000" name="subtotal" step="any">  </Input>
        </div>
        <div className={styles.fieldset}>
          <h2>Dados do Pedido</h2>
          <Input text="Data de entrega" type="date" name="forecastDate"/>
          <Input text="Meio de pagamento" type="text" name="paymentMethod" value="XXXXXXXXXXXXXX"/>
        </div>
      </form>
    </div>

  )
}

export default OrderForm