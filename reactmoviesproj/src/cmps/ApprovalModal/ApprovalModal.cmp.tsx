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
                <MyButton onClickFunction={confirmFunc} title={"Logout"} color={"rgb(237, 126, 0)"} />
                <MyButton onClickFunction={cancelFunc} title={"Cancel"} color={"rgb(94, 94, 94)"} />
            </span>
        </div>

    )
}
