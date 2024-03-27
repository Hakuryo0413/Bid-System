import React from "react";
import CreateAccount from "../../components/user/signup/createAccount";
import CommonHeader from "../../components/header/CommonHeader";
import UserSideFooter from "../../components/footer/UserSideFooter";

function CreateAccountPage() {
  return (
    <div>
      <CommonHeader />
      <CreateAccount />
      <UserSideFooter />
    </div>
  );
}

export default CreateAccountPage;
