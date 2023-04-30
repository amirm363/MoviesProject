import React from 'react'
import Styles from "./Input.module.scss"

export default function Input({ title, type, stateFunction, height, width }: any) {
    return (
        <span className={Styles.InputSpan}>
            {/* <label>{title}</label> */}
            <input type={type} title={title} placeholder={title} onChange={(e) => stateFunction(e.target.value)} style={{ height, width }} />
        </span>
    )
}
