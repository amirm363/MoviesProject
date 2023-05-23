import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'animate.css';
import axios from 'axios';
import { isUserAuthenticated, checkIfIsAdmin, getAuthenticationToken } from '../../services/authentication.service';
import Style from "./EditUsersPage.module.scss"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


export default function EditUsersPage() {
    const navigate = useNavigate()
    const [fetchedUsers, setFetchedUsers] = useState<any[]>([])
    const [isDeleted, setIsDeleted] = useState<string>("")
    const [editMode, setEditMode] = useState<number>(-1)




    const getUsersFromServer = async () => {
        const connectedUser = getAuthenticationToken()
        try {

            const response = await axios.get("http://localhost:4000/EditUsers", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${connectedUser.token}`,
                    'ConnectedUser': `${connectedUser.userName}`
                }
            })
            console.log(response.data)
            setFetchedUsers(response.data)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        if (!checkIfIsAdmin() || !isUserAuthenticated()) navigate('/menu')
        getUsersFromServer()
    }, [])

    const deleteUser = async (user: any) => {
        setIsDeleted(user.userName)
        setTimeout(() => {
            const fetchedUsersCopy = JSON.parse(JSON.stringify(fetchedUsers))
            const findUserIndex = fetchedUsersCopy.findIndex((searchedUser: any) => user.userName === searchedUser.userName)
            fetchedUsersCopy.splice(findUserIndex, 1)
            console.log("🚀 ~ file: EditUsersPage.tsx:42 ~ deleteUser ~ fetchedUsersCopy:", fetchedUsersCopy)
            setFetchedUsers(fetchedUsersCopy)
        }, 600)
    }

    const editRow = (row: number) => {
        if (editMode === row) {
            setEditMode(-1)

        } else {
            setEditMode(row)
        }
    }
    return (
        <div className={Style.EditUsersContainer}>
            <table className={Style.EditUsersTable}>
                <caption>
                    Edit users
                </caption>
                <tr>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Number of transactions</th>
                    <th>Date Created</th>
                    <th>Logged in date</th>
                    <th>Admin</th>
                    <th>{ }</th>
                </tr>
                {fetchedUsers.map((user: any, index: number) => {
                    const formattedDate = new Date(user.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                    return <tr key={user.userName} className={user.userName === isDeleted ? "animate__animated animate__flipOutX animate__faster" : ""}>
                        <td data-cell="user name"><input type="text" title='userName' value={user.userName} disabled={editMode !== index ? true : false} style={{ border: editMode !== index ? "" : "1px solid white" }} /></td>
                        <td data-cell="password"><input type="text" title='password' value={user.password} disabled={editMode !== index ? true : false} style={{ border: editMode !== index ? "" : "1px solid white" }} /></td>
                        <td data-cell="numOfTransactions"><input type="number" title='numOfTransactions' value={user.numOfTransactions} disabled={editMode !== index ? true : false} style={{ border: editMode !== index ? "" : "1px solid white" }} /></td>
                        <td data-cell="User Created Date">{user.createdDate}</td>
                        <td data-cell="User Last login date">{formattedDate}</td>
                        <td data-cell="is admin"><input type="text" title='isAdmin' />{user.loggedInDate}</td>
                        <td data-cell="" className={Style.ButtonContainerTd}>
                            <button title='EditUser' style={{ backgroundColor: "lightblue", border: "none" }} onClick={() => editRow(index)}><EditRoundedIcon /></button>
                            <button title='DeleteUser' style={{ backgroundColor: "rgb(237, 126, 0)", border: "none" }} onClick={() => deleteUser(user)}><DeleteForeverRoundedIcon /></button>
                        </td>
                    </tr>
                })}

            </table>
        </div>
    )
}
