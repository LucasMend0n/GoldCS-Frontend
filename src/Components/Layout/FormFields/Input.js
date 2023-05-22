import React from 'react'
import styles from './Input.module.css'

function Input({ type, text, name, step, onChange, value, placeholder, required}) {
    return (
        <div className={`${styles.form_control}`}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} onChange={onChange} step={step} value={value} required={required} />
        </div>
    )
}

export default Input