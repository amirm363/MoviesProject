import React, { useState } from 'react'
import SmallLoaderCmp from '../smallLoaderCmp/SmallLoader.cmp'
import Input from '../InputCmp/Input.cmp'
import MyButton from '../ButtonCmp/MyButton.cmp'
import Styles from "./MyForm.module.scss"

interface MyFormProps {
    header: string;
    handleKeyPress?: (e: any) => void;
    inputsArray: any[];
    errorMessage?: string;
    confirmFunc: () => void;
    cancelFunc: () => void;

}

export default function MyForm({ header, handleKeyPress, inputsArray, errorMessage, confirmFunc, cancelFunc }: MyFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [inputs, setInputs] = useState<any[]>([...inputsArray])
    return (
        <>

            <div className={`${Styles.MyFormMainContainer} animate__animated animate__fadeIn`} onKeyDown={handleKeyPress}>
                <div className={Styles.MyFormInputsCard} >
                    <h1>{header}</h1>
                    {isLoading ? <SmallLoaderCmp /> :
                        <div className={Styles.MyFormInputsDiv}>
                            {inputsArray.map((input) => input)}
                        </div>}
                    <span className={Styles.MyFormButtonsContainer}>
                        <MyButton onClickFunction={confirmFunc} title={"Confirm"} />
                        <MyButton onClickFunction={cancelFunc} title={"Cancel"} />
                    </span>
                    {errorMessage && < span className={Styles.MyFormInputsDivErrorMessage}>{errorMessage}</span>}
                </div>
            </div >
        </>
    )
}
