import React from 'react'
import styles from './Select.module.css'

const Select = ({label, value, options, onChange, name}) => {
  return (
    <div className={styles.form_control}>
        <label className={styles.select}>
        {label}
        <select value={value} onChange={onChange} name={name} id={name} >
            {options.map((option) => (
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
    </label>
    </div>
    
  )
}

export default Select