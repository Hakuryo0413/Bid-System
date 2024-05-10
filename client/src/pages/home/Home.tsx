import React from 'react'
import CommonHeader from '../../components/header/CommonHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import HomePage from '../../components/user/home/Home';

function Home() {
  return (
    <div>
        <CommonHeader/>
        <HomePage/>
        <UserSideFooter/>
    </div>
  )
}

export default Home;