import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../../pages/user/UserLoginPage";
import CreateAccountPage from "../../pages/user/CreateAccountPage";

import UserHomePage from "../../pages/user/UserHomePage";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<UserHomePage />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
