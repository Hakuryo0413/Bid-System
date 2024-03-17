import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import UserLoginPage from '../../pages/user/UserLoginPage'
import CreateAccountPage from '../../pages/user/CreateAccountPage'

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path='*' element= {<Home/>} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
      </Routes>
    </div>
  )
}

export default HomeRouter