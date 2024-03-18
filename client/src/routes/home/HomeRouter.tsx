import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import UserLoginPage from "../../pages/user/UserLoginPage";
import CreateAccountPage from "../../pages/user/CreateAccountPage";
import CreateToChuc from "../../components/user/signup/createToChuc";
import CreateCaNhan from "../../components/user/signup/createCaNhan";
import CreateCaNhanPage from "../../pages/user/CreateCaNhanPage";
import CreateToChucPage from "../../pages/user/CreateToChucPage";

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/signup/tochuc" element={<CreateToChucPage />} />
        <Route path="/signup/canhan" element={<CreateCaNhanPage />} />
      </Routes>
    </div>
  );
}

export default HomeRouter;
