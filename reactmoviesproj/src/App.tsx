import React, { useEffect } from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedIn } from './store/atoms/loginAtoms';

function App() {
  const userLoggedIn = useRecoilValue<boolean>(isLoggedIn)

  return (

    <Routes>
      <Route path='/' element={userLoggedIn ? <Navigate to='/menu' /> : <LoginPage />} />
      <Route path='/menu' element={<h1>MENU</h1>} />
    </Routes>

  )

}

export default App;
