import React from 'react'
import styles from './Input.module.css'

function Input({ type, text, name, step, value, handleOnchange, placeholder, props}) {
    return (
        <div className={`${styles.form_control}`}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} onChange={handleOnchange} step={step} value={value} />
        </div>
    )
}

export default Input