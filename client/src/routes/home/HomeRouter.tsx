import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";

import AuctionInforPage from "../../pages/auction/AuctionInforPage";
import UserLoginPage from "../../pages/home/UserLoginPage";
import CreateAccountPage from "../../pages/home/CreateAccountPage";
import CreateCaNhanPage from "../../pages/home/CreateCaNhanPage";
import CreateToChucPage from "../../pages/home/CreateToChucPage";

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/signup/canhan" element={<CreateCaNhanPage />} />
        <Route path="/signup/tochuc" element={<CreateToChucPage />} />
      </Routes>
    </div>
  );
}

export default HomeRouter;
