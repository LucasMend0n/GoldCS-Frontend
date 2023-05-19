import React from 'react'
import Input from '../../Layout/FormFields/Input'
import styles from './SearchOrder.module.css'
import SubmitButton from '../../Layout/FormFields/SubmitButton'
import {CiSearch} from 'react-icons/ci'


function SearchOrder() {
    return (
        <div className={styles.container}>
            <div className={styles.searchControl}>
                <h1>Encontrar um pedido</h1>
                <Input type="search" placeholder= "Insira o ID do pedido" />
                <SubmitButton text={ <CiSearch /> } />
            </div>
        </div>
    )
}

export default SearchOrder