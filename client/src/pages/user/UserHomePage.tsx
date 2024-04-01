import React from "react";
import CreateAccount from "../../components/user/signup/createAccount";
import CommonHeader from "../../components/header/CommonHeader";
import UserSideFooter from "../../components/footer/UserSideFooter";
import Sidenav from "../../components/side-nav/SideNav";
import { NavRoutes } from "../../context/NavRoutes";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserProfile from "../../components/user/home/UserProfile";
import UserPayment from "../../components/user/home/UserPayment";
import UserCancelPayment from "../../components/user/home/UserCancelPayment";
// import UserYeuCau from "./UserYeuCau"; // Import the missing component
import UserHeader from "../../components/header/UserHeader";
import HistoryAuction from "../auction/HistoryAuctionPage";

function UserHomePage() {
  return (
    <div>
      <UserHeader />
      <div className="flex">
        <div className="w-1/5">
          <Sidenav routes={NavRoutes} />
        </div>
        {/* import UserYeuCau from "../../components/user/home/UserYeuCau"; // Import the missing component */}

                <div className="w-4/5 pl-6 pr-6">
                  <Routes>
                    <Route path="/profile" element={<UserProfile />} />

                    <Route path="/history" />

                    <Route path="/payment" element={<UserPayment />} />
                    <Route path="/cancel" element={<UserCancelPayment />} />

                    {/* Add more routes here */}
                  </Routes>
                </div>
      </div>
    </div>
  );
}

export default UserHomePage;
