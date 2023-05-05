import React, { useEffect, useLayoutEffect } from 'react'
import Styles from "./MenuPage.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import 'animate.css';
import { isUserAuthenticated } from '../../services/authentication.service';


export default function MenuPage() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserAuthenticated()) navigate('/')
    }, [])

    const checkIfIsAdmin = (): boolean => {
        const user: any = sessionStorage.getItem("connectedUser")
        if (user !== null) {

            console.log(JSON.parse(user))
            return JSON.parse(user)?.isAdmin
        }
        return false;
    }
    return (
        <div className={`${Styles.MenuPageMainContainer}  animate__animated animate__fadeIn`}>
            <div className={Styles.MenuPageLinksArea}>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/SearchMovies")}>Search for movies</span>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/CreateMovies")}>Create new movie</span>
                {checkIfIsAdmin() && <span className={Styles.MenuPageLink} onClick={() => navigate("/EditUsers")}>Edit users</span>}
            </div>
        </div>
    )
}
