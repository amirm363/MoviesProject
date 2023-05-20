import React, { useEffect, useLayoutEffect } from 'react'
import Styles from "./MenuPage.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import 'animate.css';
import { isUserAuthenticated, checkIfIsAdmin } from '../../services/authentication.service';


export default function MenuPage() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserAuthenticated()) navigate('/')
    }, [])


    return (
        <div className={`${Styles.MenuPageMainContainer}  animate__animated animate__fadeIn`}>
            <div className={Styles.MenuPageLinksArea}>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/SearchMovies")}>Search shows</span>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/CreateMovies")}>Create new show</span>
                {checkIfIsAdmin() && <span className={Styles.MenuPageLink} onClick={() => navigate("/EditUsers")}>Edit users</span>}
            </div>
        </div>
    )
}
