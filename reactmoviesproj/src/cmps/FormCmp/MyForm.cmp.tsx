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
    isLoading: boolean;
    colors: string[];
}

export default function MyForm({ header, handleKeyPress, inputsArray, errorMessage, confirmFunc, cancelFunc, isLoading, colors }: MyFormProps) {
    const [loading, setLoading] = useState<boolean>(isLoading)
    const [inputs, setInputs] = useState<any[]>([...inputsArray])
    return (
        <>

            <div className={`${Styles.MyFormMainContainer} animate__animated animate__fadeIn`} onKeyDown={handleKeyPress}>
                <div className={Styles.MyFormInputsCard} >
                    <span>{header}</span>
                    {isLoading ? <SmallLoaderCmp /> :
                        <div className={Styles.MyFormInputsDiv}>
                            {inputsArray.map((input, index) => {
                                // { console.log(input.isEmpty) }
                                return <React.Fragment key={index}>
                                    <Input type={input.type} title={input.title} stateFunction={input.stateFunction} height={input.height} width={input.width} required={input.required} isEmpty={input.isEmpty} />
                                    {/* {input} */}
                                </React.Fragment>
                            })}
                        </div>}
                    <span className={Styles.MyFormButtonsContainer}>
                        <MyButton onClickFunction={confirmFunc} title={"Confirm"} color={colors.length ? colors[0] : ""} />
                        <MyButton onClickFunction={cancelFunc} title={"Cancel"} color={colors.length ? colors[1] : ""} />
                    </span>
                    {errorMessage && < span className={Styles.MyFormInputsDivErrorMessage}>{errorMessage}</span>}
                </div>
            </div >
        </>
    )
}
