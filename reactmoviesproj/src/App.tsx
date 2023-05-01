import React, { useEffect } from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedIn } from './store/atoms/loginAtoms';
import Styles from "./App.module.scss"
import MenuPage from './Pages/MenuPage/MenuPage';

function App() {
  const userLoggedIn = useRecoilValue<boolean>(isLoggedIn)

  return (
    <>
      <img src={require('./assets/Movies_Logo-removebg.png')} alt='Movies Logo' className={Styles.MoviesLogo} />
      <Routes>
        <Route path='/' element={userLoggedIn ? <Navigate to='/menu' /> : <LoginPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path="/SearchMovies" element={<h1>Search For Movies</h1>} />
        <Route path="/CreateMovies" element={<h1>Create new movie</h1>} />

      </Routes>
    </>

  )

}

export default App;
