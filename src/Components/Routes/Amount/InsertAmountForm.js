import React, { useState } from 'react'
import SubmitButton from '../../Layout/FormFields/SubmitButton'
import './InsertAmountForm.css'
import Select from '../../Layout/FormFields/Select'
import Input from '../../Layout/FormFields/Input'

const InsertAmountForm = () => {
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
        <div className={"Amountcontainer"}>
            <form className={"AmountForm"}>

                <div className={"formLegend"}>
                    <h1>Inserir estoque</h1>
                    <p>Selecione o produto e escolha a quantidade</p>
                </div>

                <div className={"formFields"}>
                    <Select label="Produto"
                        options={options}
                        value={value}
                        onChange={handleChange}
                    />
                    <Input text="Quantidade" placeholder="Insira a quantidade" />
                </div>
                <div className={"formButtons"}>
                    <SubmitButton text="Inserir" />
                </div>
            </form>

        </div>
    )
}

export default InsertAmountForm