import { Route, Routes } from "react-router-dom";
import CreateAccountPage from "../../pages/home/CreateAccountPage";

import UserHomePage from "../../pages/user/UserHomePage";
import UserYeuCau from "../../pages/user/UserYeuCau"; // Import the missing component

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<UserHomePage />} />
        <Route path="/yeucau" element={<UserYeuCau />} /> // Use the imported component
       \
      </Routes>
    </div>
  );
};

export default UserRouter;
