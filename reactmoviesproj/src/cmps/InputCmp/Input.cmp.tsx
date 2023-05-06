import React from 'react'
import Styles from "./Input.module.scss"

interface InputProps {
    title: string;
    type: string;
    stateFunction: (e: string) => void;
    height?: string
    width?: string;
    isEmpty?: boolean;
    required: boolean;
}

export default function Input({ title, type, stateFunction, height, width, isEmpty }: InputProps) {

    return (
        <span className={Styles.InputSpan}>
            <input required type={type} title={title} placeholder={`${title}*`} onChange={(e) => stateFunction(e.target.value)} style={{ height, width, outline: isEmpty ? "1px solid red" : "none" }} />
        </span>
    )
}
