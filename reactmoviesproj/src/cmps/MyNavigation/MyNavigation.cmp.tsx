import React, { useEffect, useRef, useState } from 'react'
import Styles from './MyNavigation.module.scss'
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import 'animate.css';

interface MyNavigationProps {
    setOpenLogOutModal: () => void;
}

export default function MyNavigation({ setOpenLogOutModal }: MyNavigationProps) {
    const [openUserMenu, setOpenUserMenu] = useState<boolean>(false)
    const userMenuRef = useRef<HTMLDivElement>(null);
    const userIconRef = useRef<HTMLLIElement>(null)

    const setUserMenuState = () => {
        setOpenUserMenu(!openUserMenu)
    }

    const handleClickOutside = (ev: MouseEvent) => {
        if (!userIconRef.current?.contains(ev.target as Node) && userMenuRef.current && !userMenuRef.current.contains(ev.target as Node))
            setOpenUserMenu(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <nav className={Styles.MyNavigationMainContainer}>
            <ul className={Styles.MyNavigationUl}>
                <li onClick={setUserMenuState} ref={userIconRef}><Person2RoundedIcon />
                    {openUserMenu &&
                        <div onClick={(event) => event.stopPropagation()} className={`${Styles.UserMenu}`} ref={userMenuRef}>
                            <span>USER SETTINGS</span>
                            <span onClick={setOpenLogOutModal}>LOGOUT</span>
                        </div>}
                </li>
                <li><MenuRoundedIcon /></li>
            </ul>

        </nav>
    )
}
