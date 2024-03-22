import React from 'react'
import AdminHeader from '../../components/header/AdminHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import AuctionInfor from '../../components/auction/AuctionInfor';

function AuctionInforPage() {
  return (
    <div>
        <AdminHeader/>
        <AuctionInfor/>
        <UserSideFooter/>
    </div>
  )
}

export default AuctionInforPage;