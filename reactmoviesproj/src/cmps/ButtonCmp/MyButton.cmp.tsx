import React from 'react'
import Styled from "./MyButton.module.scss"

interface MyButtonProps {
    title: string;
    onClickFunction: () => void;
    color?: string;
}

export default function MyButton({ title, onClickFunction, color }: MyButtonProps) {
    return (
        <>
            <button className={Styled.MyButton} onClick={onClickFunction} style={{ backgroundColor: color }}>{title}</button>
        </>
    )
}
