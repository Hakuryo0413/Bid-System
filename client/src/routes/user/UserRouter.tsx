import { Route, Routes } from "react-router-dom";
import CreateAccountPage from "../../pages/home/CreateAccountPage";

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
