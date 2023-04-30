import Styles from './LoginPage.module.scss'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Input from '../../cmps/InputCmp/Input.cmp';

import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../../store/atoms/loginAtoms';
import SmallLoaderCmp from "../../cmps/smallLoaderCmp/SmallLoader.cmp"



export default function LoginPage() {
    const [userCredentials, setUserCredentials] = useState<any>({ userName: "", password: "" })
    const [userLoggedIn, setUserLoggedIn] = useRecoilState<boolean>(isLoggedIn)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const logInUser = async () => {
        setIsLoading(!isLoading)
        const data = await axios.post('http://localhost:3000/', userCredentials)
        if (data.data) {
            setUserLoggedIn(true)
        }
        return
    }


    const handleKeyPress = ((e: any) => {
        if (e.key === "Enter") {
            // Run your function here
            logInUser()
        }

    })
    useEffect(() => {
        console.log(userCredentials)
    }, [userCredentials])

    return (


        <>
            <img src={require('../../assets/Movies_Logo-removebg.png')} alt='Movies Logo' className={Styles.MoviesLogo} />
            <div className={Styles.LoginPageMainContainer} onKeyDown={handleKeyPress}>
                <div className={Styles.LoginPageInputsCard} >
                    <h1>Login</h1>
                    {isLoading ? <SmallLoaderCmp /> :
                        <div className={Styles.InputsDiv}>
                            <Input type={"text"} title={"User Name"} stateFunction={(value: string) => setUserCredentials({ ...userCredentials, userName: value })} height={"25px"} />
                            <Input type={"password"} title={"Password"} stateFunction={(value: string) => setUserCredentials({ ...userCredentials, password: value })} height={"25px"} />
                        </div>}
                </div>
            </div>
        </>


    )
}
