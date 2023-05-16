import React from 'react'
import Styles from './MyNavigation.module.scss'
import { BsPersonCircle } from "react-icons/bs";


export default function MyNavigation() {
    return (
        <div className={Styles.MyNavigationMainContainer}>
            <div className={Styles.MyNavigationSpan}>
                <span>MENU</span>
                <span><BsPersonCircle /></span>
            </div>
        </div>
    )
}
