import React from 'react'
import AdminHeader from '../../components/header/AdminHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import AuctionInfor from '../../components/auction/AuctionInfor';
import UserHeader from '../../components/header/UserHeader';

interface AuctionInforPageProps {
  code: string;
}

const AuctionInforPage: React.FC<AuctionInforPageProps> = ({ code }) => {
  return (
    <div>
        <UserHeader/>
        <AuctionInfor code={code}/>
        <UserSideFooter/>
    </div>
  )
}

export default AuctionInforPage;