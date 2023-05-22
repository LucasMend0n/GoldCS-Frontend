import React from 'react'
import styles from './SubmitButton.module.css'

function SubmitButton({text}, onClick) {
  return (
        <button onClick={onClick} className={styles.btn}>{text}</button>
  )
}

export default SubmitButton