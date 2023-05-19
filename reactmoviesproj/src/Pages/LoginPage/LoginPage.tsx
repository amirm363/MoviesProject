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
    const [inputs, setInputs] = useState<any[]>([{ type: "text", title: "User Name", stateFunction: (value: string) => setUserCredentials((prevValue: any) => ({ ...prevValue, userName: value })), height: "45px", width: "60%", isEmpty: requiredInputState.userName, required: true },
    { type: "password", title: "Password", stateFunction: (value: string) => setUserCredentials((prevValue: any) => ({ ...prevValue, password: value })), height: "45px", width: "60%", isEmpty: requiredInputState.password, required: true }])
    const navigate = useNavigate();


    useEffect(() => { console.log(requiredInputState) }, [requiredInputState])

    const validateCredentials = (): boolean => {
        if (userCredentials.password === "") {
            setRequiredInputState((prevState: any) => ({ ...prevState, password: true }))
            return false;
        } else if (userCredentials.password && requiredInputState.password) {
            setRequiredInputState((prevState: any) => ({ ...prevState, password: false }))
        }
        if (userCredentials.userName === "") {
            setRequiredInputState((prevState: any) => ({ ...prevState, userName: true }))
            return false;
        } else if (userCredentials.password && requiredInputState.userName) {
            setRequiredInputState((prevState: any) => ({ ...prevState, userName: false }))
        }
        return true;
    }

    const logInUser = async () => {
        if (!validateCredentials()) return
        try {
            setIsLoading(!isLoading)
            const data = await axios.post('http://localhost:4000/', { ...userCredentials, date: new Date() })
            console.log(data);
            console.log(data.data)
            if (data.data?.accessToken) {
                sessionStorage.setItem("connectedUser", JSON.stringify(data.data))
                setShowLogOutButton(true)
                navigate("/menu")
            }
        } catch (err: any) {
            console.log(err)
            setWrongCredentials({ state: true, error: err.response.data })
            setUserCredentials({ userName: "", password: "" })
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
            <MyForm header={"Login"} handleKeyPress={handleKeyPress} inputsArray={inputs} errorMessage={wrongCredentials.error} confirmFunc={logInUser} cancelFunc={cancelLogin} isLoading={isLoading} colors={["#75a977", "#5e5e5e"]} />
        </>


    )
}
