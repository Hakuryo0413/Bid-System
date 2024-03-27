import React from "react";
import UserLogin from "../../components/user/login/UserLogin";
import CommonHeader from "../../components/header/CommonHeader";
import UserSideFooter from "../../components/footer/UserSideFooter";

const UserLoginPage = () => {
  return (
    <div>
      <CommonHeader />
      <UserLogin />
      <UserSideFooter/>
    </div>
  );
};

export default UserLoginPage;
