import Styles from './LoginPage.module.scss'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Input from '../../cmps/InputCmp/Input.cmp';
import 'animate.css';
import { useRecoilState } from 'recoil';
import SmallLoaderCmp from "../../cmps/smallLoaderCmp/SmallLoader.cmp"
import MyButton from '../../cmps/ButtonCmp/MyButton.cmp';
import { useNavigate } from 'react-router';
import MyForm from '../../cmps/FormCmp/MyForm.cmp';
import { logOutButton } from '../../store/atoms/loginAtoms';


export default function LoginPage() {
    const [userCredentials, setUserCredentials] = useState<any>({ userName: "", password: "" })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showLogOutButton, setShowLogOutButton] = useRecoilState<boolean>(logOutButton)
    const [wrongCredentials, setWrongCredentials] = useState<any>({ state: false, error: "" })
    const [requiredInputState, setRequiredInputState] = useState<any>({ userName: false, password: false })
    const navigate = useNavigate();

    const inputs = [<Input type={"text"} title={"User Name"} stateFunction={(value: string) => setUserCredentials({ ...userCredentials, userName: value })} height={"45px"} width={"60%"} isEmpty={requiredInputState.userName} required={true} />,
    <Input type={"password"} title={"Password"} stateFunction={(value: string) => setUserCredentials({ ...userCredentials, password: value })} height={"45px"} width={"60%"} isEmpty={requiredInputState.password} required={true} />]


    const logInUser = async () => {


        setIsLoading(!isLoading)
        const data = await axios.post('http://localhost:4000/', userCredentials)
        console.log(data.data)
        if (data.data?.accessToken) {
            sessionStorage.setItem("connectedUser", JSON.stringify(data.data))
            setShowLogOutButton(true)
            navigate("/menu")
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
        setRequiredInputState({ userName: false, password: false })
    }


    const handleKeyPress = ((e: any) => {
        if (e.key === "Enter") {

            logInUser()
        }

    })


    return (


        <>
            <MyForm header={"Login"} handleKeyPress={handleKeyPress} inputsArray={inputs} errorMessage={wrongCredentials.error} confirmFunc={logInUser} cancelFunc={cancelLogin} isLoading={isLoading} />
            {/* <div className={`${Styles.LoginPageMainContainer} animate__animated animate__fadeIn`} onKeyDown={handleKeyPress}>
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
            </div > */}
        </>


    )
}
