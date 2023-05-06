import React from 'react'
import Styles from "./ApprovalModal.module.scss"
import MyButton from '../ButtonCmp/MyButton.cmp'

interface ApprovalModalProps {
    confirmFunc: () => void;
    cancelFunc: () => void;
}

export default function ApprovalModal({ confirmFunc, cancelFunc }: ApprovalModalProps) {
    return (

        <div className={Styles.ModalContainer}>
            <span>Sign out</span>
            <span className={Styles.ButtonsContainer}>
                <MyButton onClickFunction={confirmFunc} title={"Logout"} />
                <MyButton onClickFunction={cancelFunc} title={"Cancel"} color={"rgba(255, 0, 34, 0.514)"} />
            </span>
        </div>

    )
}
