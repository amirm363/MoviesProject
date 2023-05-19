import React, { useEffect, useState } from 'react'
import Styles from "./CreateMovie.module.scss"
import MyForm from '../../cmps/FormCmp/MyForm.cmp'
import Input from '../../cmps/InputCmp/Input.cmp'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { getAuthenticationToken } from '../../services/authentication.service'



export default function CreateMovie() {
    const navigate = useNavigate()
    const [newMovieData, setNewMovieData] = useState<any>({ name: "", language: "", genres: [] })
    const [requiredInputs, setRequiredInputs] = useState<any>({ name: false, language: false, genres: false })
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [inputProps, setInputProps] = useState<any[]>([{ type: "text", title: "name", stateFunction: (value: string) => setNewMovieData({ ...newMovieData, name: value }), height: "45px", width: "60%", require: true, isEmpty: requiredInputs.name }])
    const [inputs, setInputs] = useState<any[]>(
        [{ type: "text", title: "Name", stateFunction: (value: string) => setNewMovieData((prevState: any) => ({ ...prevState, name: value })), height: "45px", width: "60%", isEmpty: requiredInputs.name, required: true },
        { type: "text", title: "Language", stateFunction: (value: string) => setNewMovieData((prevState: any) => ({ ...prevState, language: value })), height: "45px", width: "60%", isEmpty: requiredInputs.language, required: true },
        { type: "text", title: "Genres", stateFunction: (value: string) => setNewMovieData((prevState: any) => ({ ...prevState, genres: value.split(",") })), height: "45px", width: "60%", isEmpty: requiredInputs.genres, required: true }]
    )

    const sendNewMovieDataToServer = async () => {
        console.log(validateRequiredInputs())
        if (validateRequiredInputs()) {
            try {
                setIsLoading(true);
                const authData = getAuthenticationToken()
                // const connectedUser = sessionStorage.getItem("connectedUser")
                // const token: string | null = connectedUser ? JSON.parse(connectedUser).accessToken : null;
                // const userName: string | null = connectedUser ? JSON.parse(connectedUser).userName : null;
                const request = await axios.post("http://localhost:4000/CreateMovie", newMovieData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`,
                        'ConnectedUser': `${authData.userName}`
                    }
                })
                setNewMovieData({ name: "", language: "", genres: [] })
                console.log(request.status)

            } catch (err: any) {
                setErrorMessage(err.response.data.error)

            }
            setIsLoading(false);
        }
        else {
            setErrorMessage("One or more required inputs has no data")
        }
    }

    const validateRequiredInputs = () => {
        let tempRequiredInputs = JSON.parse(JSON.stringify(requiredInputs))
        tempRequiredInputs = newMovieData.name === "" ? { ...tempRequiredInputs, name: true } : { ...tempRequiredInputs, name: false }
        tempRequiredInputs = newMovieData.language === "" ? { ...tempRequiredInputs, language: true } : { ...tempRequiredInputs, language: false }
        tempRequiredInputs = newMovieData.genres.length === 0 ? { ...tempRequiredInputs, genres: true } : { ...tempRequiredInputs, genres: false }
        console.log(tempRequiredInputs)
        setRequiredInputs(tempRequiredInputs)
        return !(tempRequiredInputs.genres || tempRequiredInputs.language || tempRequiredInputs.name)

    }

    useEffect(() => {
        console.log(requiredInputs, newMovieData)
    }, [requiredInputs])

    const handleKeyPress = ((e: any) => {
        if (e.key === "Enter") {

            sendNewMovieDataToServer();
        }

    })



    const backToMenu = () => {
        navigate('/menu')
    }
    return (
        <>
            <MyForm header={"Create new movie"} handleKeyPress={handleKeyPress} inputsArray={inputs} errorMessage={errorMessage} confirmFunc={sendNewMovieDataToServer} cancelFunc={backToMenu} isLoading={isLoading} colors={[]} />
        </>
    )
}
