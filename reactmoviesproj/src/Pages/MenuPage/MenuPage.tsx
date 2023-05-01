import React from 'react'
import Styles from "./MenuPage.module.scss"
import { Link, useNavigate } from 'react-router-dom'


export default function MenuPage() {
    const navigate = useNavigate()
    return (
        <div className={Styles.MenuPageMainContainer}>
            <div className={Styles.MenuPageLinksArea}>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/SearchMovies")}>Search for movies</span>
                <span className={Styles.MenuPageLink} onClick={() => navigate("/CreateMovies")}>Create new movie</span>
            </div>
        </div>
    )
}
