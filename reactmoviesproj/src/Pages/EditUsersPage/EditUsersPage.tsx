import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'animate.css';
import axios from 'axios';
import { isUserAuthenticated, checkIfIsAdmin, getAuthenticationToken } from '../../services/authentication.service';
import Style from "./EditUsersPage.module.scss"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import 'animate.css';
import ApprovalModal from '../../cmps/ApprovalModal/ApprovalModal.cmp';
import { User } from "../../services/interfaces"


export default function EditUsersPage() {
    const navigate = useNavigate()
    const [fetchedUsers, setFetchedUsers] = useState<User[]>([])
    const [isDeleted, setIsDeleted] = useState<string>("")
    const [editMode, setEditMode] = useState<number>(-1)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [userToDelete, setUserToDelete] = useState<any>({})
    const [userToUpdate, setUserToUpdate] = useState<any>({ empty: true })
    const [updatedUserProps, setUpdatedUserProps] = useState<User>({
        userName: "", password: "", createdDate: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }), numOfTransactions: 10, date: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }), isAdmin: false
    })




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

    const deleteUser = async (user: User) => {
        setIsDeleted(user.userName)
        setOpenDeleteModal(false)
        setTimeout(() => {
            const fetchedUsersCopy = JSON.parse(JSON.stringify(fetchedUsers))
            const findUserIndex = fetchedUsersCopy.findIndex((searchedUser: any) => user.userName === searchedUser.userName)
            fetchedUsersCopy.splice(findUserIndex, 1)
            console.log("🚀 ~ file: EditUsersPage.tsx:42 ~ deleteUser ~ fetchedUsersCopy:", fetchedUsersCopy)
            setFetchedUsers(fetchedUsersCopy)
        }, 600)
    }

    const sendUpdatedUser = async (user: User) => {
        console.log(user)
        try {
            console.log(axios.post('http://localhost:4000/EditUsers', user))
        } catch (err) {
            console.error(err)
        }
    }

    const updateUser = (prop: keyof User, index: number, value: any) => {
        const updatedUsers = [...fetchedUsers];
        updatedUsers[index] = {
            ...updatedUsers[index],
            [prop]: value
        };
        setFetchedUsers(updatedUsers);
    };


    const editRow = (user: User, row: number) => {
        if (editMode === row) {
            setEditMode(-1)
            setUserToUpdate(user)
        } else {
            setEditMode(row)
            setUserToUpdate({ empty: true })
        }
    }

    const openModalAndSendUserData = (user: User) => {
        setUserToDelete(user)
        setOpenDeleteModal(true)
    }
    return (
        <div className={Style.EditUsersContainer}>
            <span>EDIT USERS</span>
            <div className={Style.TableContainer}>
                <table className={Style.EditUsersTable}>
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Number of transactions</th>
                        <th>Date Created</th>
                        <th>Logged in date</th>
                        <th>Admin</th>
                        <th>{ }</th>
                    </tr>
                    {fetchedUsers.map((user: User, index: number) => {
                        const formattedDate = new Date(user.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })

                        return <tr key={user.userName} className={user.userName === isDeleted ? "animate__animated animate__flipOutX animate__faster" : ""}>
                            <td data-cell="user name"><input type="text" title='userName' value={user.userName} disabled={editMode !== index} style={{ border: editMode !== index ? "" : "1px solid white" }} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => updateUser(ev.target.title as keyof User, index, ev.target.value)} /></td>
                            <td data-cell="password"><input type="text" title='password' value={user.password} disabled={editMode !== index} style={{ border: editMode !== index ? "" : "1px solid white" }} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => updateUser(ev.target.title as keyof User, index, ev.target.value)} /></td>
                            <td data-cell="numOfTransactions"><input type="number" title='numOfTransactions' value={user.numOfTransactions} disabled={editMode !== index} style={{ border: editMode !== index ? "" : "1px solid white" }} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => updateUser(ev.target.title as keyof User, index, ev.target.value)} /></td>
                            <td data-cell="User Created Date">{user.createdDate}</td>
                            <td data-cell="User Last login date">{formattedDate}</td>
                            <td data-cell="is admin"><input type="text" title='isAdmin' value={String(user.isAdmin)} disabled={editMode !== index} style={{ border: editMode !== index ? "" : "1px solid white" }} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => updateUser(ev.target.title as keyof User, index, ev.target.value)} /></td>
                            <td data-cell="" className={Style.ButtonContainerTd}>
                                <button title='EditUser' style={{ backgroundColor: editMode !== index ? "lightblue" : "lightgreen", border: "none" }} onClick={() => editRow(user, index)} className={editMode === index ? `animate__animated animate__flipInY` : "animate__animated animate__flipInX"}>{editMode !== index ? <EditRoundedIcon /> : <SendRoundedIcon />}</button>
                                <button title='DeleteUser' style={{ backgroundColor: "rgb(237, 126, 0)", border: "none" }} onClick={() => openModalAndSendUserData(user)}><DeleteForeverRoundedIcon /></button>
                            </td>
                        </tr>
                    })}

                </table>
            </div>
            {!userToUpdate.empty && <ApprovalModal confirmFunc={() => sendUpdatedUser(updatedUserProps)} cancelFunc={() => setUserToUpdate({ empty: true })} title={`Update ${userToUpdate.userName}?`} confirmButtonTitle={"Confirm"} cancelButtonTitle={"Cancel"} />}
            {openDeleteModal && <ApprovalModal confirmFunc={() => deleteUser(userToDelete)} cancelFunc={() => setOpenDeleteModal(false)} title={`Delete ${userToDelete.userName}?`} confirmButtonTitle={"Confirm"} cancelButtonTitle={"Cancel"} />}
        </div>
    )
}
