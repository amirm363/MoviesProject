import React, { useEffect, useState } from 'react'
import Styles from "./CreateMovie.module.scss"
import MyForm from '../../cmps/FormCmp/MyForm.cmp'
import Input from '../../cmps/InputCmp/Input.cmp'
import { useNavigate } from 'react-router'
import axios from 'axios'



export default function CreateMovie() {
    const navigate = useNavigate()
    const [newMovieData, setNewMovieData] = useState<any>({ name: "", language: "", genres: [] })
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requiredInputs, setRequiredInputs] = useState<any>({ name: false, language: false, genres: false })

    const [inputs, setInputs] = useState<any[]>(
        [<Input type={"text"} title={"Name"} stateFunction={(value: string) => setNewMovieData({ ...newMovieData, name: value })} height={"45px"} width={"60%"} required={true} isEmpty={requiredInputs.name} />,
        <Input type={"text"} title={"Language"} stateFunction={(value: string) => setNewMovieData({ ...newMovieData, language: value })} height={"45px"} width={"60%"} required={true} isEmpty={requiredInputs.language} />,
        <Input type={"text"} title={"Genres"} stateFunction={(value: string) => setNewMovieData({ ...newMovieData, genres: value.split(",") })} height={"45px"} width={"60%"} required={true} isEmpty={requiredInputs.genres} />]
    )

    const sendNewMovieDataToServer = async () => {
        console.log(validateRequiredInputs())
        // if (validateRequiredInputs()) {
        try {
            setIsLoading(true);
            const connectedUser = sessionStorage.getItem("connectedUser")
            const token: string | null = connectedUser ? JSON.parse(connectedUser).accessToken : null;
            const userName: string | null = connectedUser ? JSON.parse(connectedUser).userName : null;
            const request = await axios.post("http://localhost:4000/CreateMovie", newMovieData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'ConnectedUser': `${userName}`
                }
            })
            setNewMovieData({ name: "", language: "", genres: [] })
            console.log(request.status)

        } catch (err: any) {
            setErrorMessage(err.response.data.error)

        }
        setIsLoading(false);
        // }
        // else {
        // setErrorMessage("One or more required inputs has no data")
        // }
    }

    const validateRequiredInputs = () => {
        let tempRequiredInputs = JSON.parse(JSON.stringify(requiredInputs))
        tempRequiredInputs = newMovieData.name === "" ? { ...tempRequiredInputs, name: true } : { ...tempRequiredInputs, name: false }
        tempRequiredInputs = newMovieData.language === "" ? { ...tempRequiredInputs, language: true } : { ...tempRequiredInputs, language: false }
        tempRequiredInputs = newMovieData.genres.length === 0 ? { ...tempRequiredInputs, genres: true } : { ...tempRequiredInputs, genres: false }
        console.log(tempRequiredInputs)
        setRequiredInputs(tempRequiredInputs)
        if (tempRequiredInputs.genres || tempRequiredInputs.language || tempRequiredInputs.name) {
            return false
        }
        return true
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
            <MyForm header={"Create new movie"} handleKeyPress={handleKeyPress} inputsArray={inputs} errorMessage={errorMessage} confirmFunc={sendNewMovieDataToServer} cancelFunc={backToMenu} isLoading={isLoading} />
        </>
    )
}
