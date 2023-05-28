import React, { useEffect, useState } from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import Styles from "./App.module.scss"
import MenuPage from './Pages/MenuPage/MenuPage';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreateMovie from './Pages/CreateMoviePage/CreateMovie';
import ApprovalModal from './cmps/ApprovalModal/ApprovalModal.cmp';
import MyNavigation from './cmps/MyNavigation/MyNavigation.cmp';
import SearchMoviesPage from './Pages/SearchMoviesPage/SearchMoviesPage';
import StarField from './cmps/StarAnimation/StarField.cmp';
import EditUsersPage from './Pages/EditUsersPage/EditUsersPage';

function App() {
  const navigate = useNavigate();
  // const [userLoggedIn, setUserLoggedIn] = useRecoilState<boolean>(isLoggedIn)
  const [openLogOutModal, setOpenLogOutModal] = useState<boolean>(false)


  const logOutUser = () => {
    sessionStorage.clear();
    setOpenLogOutModal(false)
    navigate('/');
  }
  return (
    <div className={Styles.AppContainer}>
      {window.location.pathname !== '/' && <MyNavigation setOpenLogOutModal={() => setOpenLogOutModal(true)} />}
      <img src={require('./assets/TV_SHOWS_PORTAL-removebg-previewCOPY.png')} alt='Movies Logo' className={Styles.MoviesLogo} />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path="/SearchMovies" element={<SearchMoviesPage />} />
        <Route path="/CreateMovies" element={<CreateMovie />} />
        <Route path="/EditUsers" element={<EditUsersPage />} />

      </Routes>
      {openLogOutModal && <ApprovalModal confirmFunc={logOutUser} cancelFunc={() => setOpenLogOutModal(false)} title={"Sign out"} confirmButtonTitle={"Confirm"} cancelButtonTitle={"Cancel"} />}
      <StarField />
    </div>

  )

}

export default App;
