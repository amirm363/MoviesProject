import React, { useEffect, useState } from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logOutButton } from './store/atoms/loginAtoms';
import Styles from "./App.module.scss"
import MenuPage from './Pages/MenuPage/MenuPage';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreateMovie from './Pages/CreateMoviePage/CreateMovie';
import ApprovalModal from './cmps/ApprovalModal/ApprovalModal.cmp';

function App() {
  const navigate = useNavigate();
  // const [userLoggedIn, setUserLoggedIn] = useRecoilState<boolean>(isLoggedIn)
  const [openLogOutModal, setOpenLogOutModal] = useState<boolean>(false)
  const [showLogOutButton, setShowLogOutButton] = useRecoilState<boolean>(logOutButton)

  const logOutUser = () => {
    sessionStorage.clear();
    setOpenLogOutModal(false)
    setShowLogOutButton(false)
    navigate('/');
  }
  return (
    <div className={Styles.AppContainer}>
      <img src={require('./assets/Movies_Logo-removebg.png')} alt='Movies Logo' className={Styles.MoviesLogo} />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path="/SearchMovies" element={<h1>Search For Movies</h1>} />
        <Route path="/CreateMovies" element={<CreateMovie />} />
        <Route path="/EditUsers" element={<h1>Edit users page</h1>} />

      </Routes>
      {openLogOutModal && <ApprovalModal confirmFunc={logOutUser} cancelFunc={() => setOpenLogOutModal(false)} />}
      {showLogOutButton && <button className={Styles.LogOutButton} title="logout" onClick={() => setOpenLogOutModal(true)}><span>&#x2715;</span></button>}
    </div>

  )

}

export default App;
