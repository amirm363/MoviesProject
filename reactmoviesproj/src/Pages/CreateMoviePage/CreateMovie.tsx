import React, { useState } from 'react'
import Styles from "./CreateMovie.module.scss"
import MyForm from '../../cmps/FormCmp/MyForm.cmp'
import Input from '../../cmps/InputCmp/Input.cmp'
import { useNavigate } from 'react-router'



export default function CreateMovie() {
    const navigate = useNavigate()
    const [newMovieData, setNewMovieData] = useState<object>({ name: "", Language: "", Genres: [] })

    const inputs =
        [<Input type={"text"} title={"Name"} stateFunction={(value: string) => console.log(value)} height={"45px"} width={"60%"} />,
        <Input type={"text"} title={"Language"} stateFunction={(value: string) => console.log(value)} height={"45px"} width={"60%"} />,
        <Input type={"text"} title={"Genres"} stateFunction={(value: string) => console.log(value)} height={"45px"} width={"60%"} />]


    const handleKeyPress = ((e: any) => {
        if (e.key === "Enter") {

            console.log("Enter")
        }

    })



    const backToMenu = () => {
        navigate('/menu')
    }
    return (
        <>
            <MyForm header={"Create new movie"} handleKeyPress={handleKeyPress} inputsArray={inputs} errorMessage={"ERROR"} confirmFunc={() => console.log("CONFIRM")} cancelFunc={backToMenu} />
        </>
    )
}
