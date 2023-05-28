import React from 'react'
import Styles from "./ApprovalModal.module.scss"
import MyButton from '../ButtonCmp/MyButton.cmp'
import 'animate.css'

interface ApprovalModalProps {
    confirmFunc: () => void;
    cancelFunc: () => void;
    title: string;
    confirmButtonTitle: string;
    cancelButtonTitle: string;
}

export default function ApprovalModal({ confirmFunc, cancelFunc, title, confirmButtonTitle, cancelButtonTitle }: ApprovalModalProps) {
    return (

        <div className={`${Styles.ModalContainer} animate__animated animate__zoomIn animate__faster`}>
            <span>{title}</span>
            <span className={Styles.ButtonsContainer}>
                <MyButton onClickFunction={confirmFunc} title={confirmButtonTitle} color={"rgb(237, 126, 0)"} />
                <MyButton onClickFunction={cancelFunc} title={cancelButtonTitle} color={"rgb(94, 94, 94)"} />
            </span>
        </div>

    )
}
