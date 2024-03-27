import React from "react";
import CommonHeader from "../../components/header/CommonHeader";
import UserSideFooter from "../../components/footer/UserSideFooter";
import CreateCaNhan from "../../components/user/signup/createCaNhan";

function CreateCaNhanPage() {
  return (
    <div>
      <CommonHeader />
      <CreateCaNhan />
      <UserSideFooter />
    </div>
  );
}

export default CreateCaNhanPage;
