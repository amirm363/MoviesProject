import Styles from './LoginPage.module.scss'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Input from '../../cmps/InputCmp/Input.cmp';

import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../../store/atoms/loginAtoms';
import SmallLoaderCmp from "../../cmps/smallLoaderCmp/SmallLoader.cmp"
import MyButton from '../../cmps/ButtonCmp/MyButton.cmp';



export default function LoginPage() {
    const [userCredentials, setUserCredentials] = useState<any>({ userName: "", password: "" })
    const [userLoggedIn, setUserLoggedIn] = useRecoilState<boolean>(isLoggedIn)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [wrongCredentials, setWrongCredentials] = useState<any>({ state: false, error: "" })


    const logInUser = async () => {
        setIsLoading(!isLoading)
        const data = await axios.post('http://localhost:3001/', userCredentials)
        console.log(data.data)
        if (data.data?.accessToken) {
            sessionStorage.setItem("connectedUser", JSON.stringify(data.data))
            setUserLoggedIn(true)
        }
        else {
            setWrongCredentials({ state: true, error: data.data.error })
            setIsLoading(false)
        }

    }

    const cancelLogin = () => {
        setIsLoading(false)
        setUserCredentials({ userName: "", password: "" })
        setWrongCredentials({ state: false, error: "" });
    }


    const handleKeyPress = ((e: any) => {
        if (e.key === "Enter") {

            logInUser()
        }

    })
    useEffect(() => {
        console.log(userCredentials)
    }, [userCredentials])

    return (


        <>

            <div className={Styles.LoginPageMainContainer} onKeyDown={handleKeyPress}>
                <div className={Styles.LoginPageInputsCard} >
                    <h1>Login</h1>
                    {isLoading ? <SmallLoaderCmp /> :
                        <div className={Styles.InputsDiv}>
                            <Input type={"text"} title={"User Name"} stateFunction={(value: string) => setUserCredentials({ ...userCredentials, userName: value })} height={"45px"} width={"60%"} />
                            <Input type={"password"} title={"Password"} stateFunction={(value: string) => setUserCredentials({ ...userCredentials, password: value })} height={"45px"} width={"60%"} />
                            {wrongCredentials.state && < span className={Styles.InputsDivErrorMessage}>{wrongCredentials.error}</span>}
                        </div>}
                    <span className={Styles.LoginButtonsContainer}>
                        <MyButton onClickFunction={logInUser} title={"Confirm"} />
                        <MyButton onClickFunction={cancelLogin} title={"Cancel"} />
                    </span>
                </div>
            </div >
        </>


    )
}
