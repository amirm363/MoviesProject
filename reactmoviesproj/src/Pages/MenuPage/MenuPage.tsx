import React from 'react'
import Styles from "./MenuPage.module.scss"
import { Link, useNavigate } from 'react-router-dom'


export default function MenuPage() {
    const navigate = useNavigate()
    const checkIfIsAdmin = (): boolean => {
        const user: any = sessionStorage.getItem("connectedUser")
        if (user !== null) {

            console.log(JSON.parse(user))
            return JSON.parse(user)?.isAdmin
        }
        return false;
    }
    return (
        <div className={Styles.MenuPageMainContainer}>
            <div className={Styles.MenuPageLinksArea}>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/SearchMovies")}>Search for movies</span>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/CreateMovies")}>Create new movie</span>
                {checkIfIsAdmin() && <span className={Styles.MenuPageLink} onClick={() => navigate("/EditUsers")}>Edit users</span>}
            </div>
        </div>
    )
}
