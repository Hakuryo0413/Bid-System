import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import UserLoginPage from "../../pages/user/UserLoginPage";
import CreateAccountPage from "../../pages/user/CreateAccountPage";
import CreateCaNhanPage from "../../pages/user/CreateCaNhanPage";
import CreateToChucPage from "../../pages/user/CreateToChucPage";
import AuctionInforPage from "../../pages/auction/AuctionInforPage";


function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<AuctionInforPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/signup/canhan" element={<CreateCaNhanPage />} />
        <Route path="/signup/tochuc" element={<CreateToChucPage />} />

      </Routes>
    </div>
  );
}

export default HomeRouter;
