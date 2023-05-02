import React from 'react'
import Styles from "./Input.module.scss"

interface InputProps {
    title: string;
    type: string;
    stateFunction: (e: string) => void;
    height?: string
    width?: string;
}

export default function Input({ title, type, stateFunction, height, width }: InputProps) {
    return (
        <span className={Styles.InputSpan}>
            <input type={type} title={title} placeholder={title} onChange={(e) => stateFunction(e.target.value)} style={{ height, width }} />
        </span>
    )
}
