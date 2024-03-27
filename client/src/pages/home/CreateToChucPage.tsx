import React from "react";
import CommonHeader from "../../components/header/CommonHeader";
import UserSideFooter from "../../components/footer/UserSideFooter";
import CreateToChuc from "../../components/user/signup/createToChuc";

function CreateToChucPage() {
  return (
    <div>
      <CommonHeader />
      <CreateToChuc />
      <UserSideFooter />
    </div>
  );
}

export default CreateToChucPage;
