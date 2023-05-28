import React, { useEffect, useRef, useState } from 'react'
import Style from './MyNavigation.module.scss'
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import 'animate.css';
import { styled } from '@mui/material';
import { Link } from "react-router-dom"

interface MyNavigationProps {
    setOpenLogOutModal: () => void;
}

export default function MyNavigation({ setOpenLogOutModal }: MyNavigationProps) {
    const [openUserMenu, setOpenUserMenu] = useState<boolean>(false)
    const userMenuRef = useRef<HTMLDivElement>(null);
    const userIconRef = useRef<HTMLLIElement>(null)
    const [openMenuDrawer, setOpenMenuDrawer] = useState<boolean>(false)
    const [drawerAnimation, setDrawerAnimation] = useState<string>("animate__animated animate__slideInLeft animate__faster")

    const setUserMenuState = () => {
        setOpenUserMenu(!openUserMenu)
    }
    // Prevents from click event on the inner part of the user menu to close it
    const handleClickOutside = (ev: MouseEvent) => {
        if (!userIconRef.current?.contains(ev.target as Node) && userMenuRef.current && !userMenuRef.current.contains(ev.target as Node))
            setOpenUserMenu(false)
    }
    // UseEffect that acts as a listener for the click event and a setter of the openUserMenu state
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    // function that opens and closes the menu drawer plus setting a time out on close so the animation will have enough time to finish.
    const openAndCloseDrawer = () => {
        if (openMenuDrawer) {
            setDrawerAnimation("animate__animated animate__slideOutLeft animate__faster")
            setTimeout(() => {
                setOpenMenuDrawer(false)
            }, 500)
        } else {

            setDrawerAnimation("animate__animated animate__slideInLeft animate__faster")
            setOpenMenuDrawer(true)
        }
    }
    return (
        <>
            <nav className={Style.MyNavigationMainContainer}>
                <ul className={Style.MyNavigationUl}>
                    <li onClick={setUserMenuState} ref={userIconRef}><Person2RoundedIcon />
                        {openUserMenu &&
                            <div onClick={(event) => event.stopPropagation()} className={`${Style.UserMenu}`} ref={userMenuRef}>
                                <span>USER SETTINGS</span>
                                <span onClick={setOpenLogOutModal}>LOGOUT</span>
                            </div>}
                    </li>
                    <li><img src={require('../../assets/Small_tvshows_logo-removebg-preview.png')} style={{ height: "50px", width: "50px" }} /><MenuRoundedIcon onClick={openAndCloseDrawer} /></li>

                </ul>
                {
                    openMenuDrawer &&
                    <div className={`${Style.MenuDrawerContainer} ${drawerAnimation}`}>
                        <div className={Style.LinksContainer}>
                            <Link to={"/menu"} className={Style.Link}>Menu</Link>
                            <Link to={"/SearchMovies"} className={Style.Link}>Search shows</Link>
                            <Link to={"/CreateMovies"} className={Style.Link}>Create show</Link>
                        </div>
                    </div>
                }

            </nav>
        </>
    )
}
