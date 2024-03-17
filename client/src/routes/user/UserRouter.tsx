import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../../pages/user/UserLoginPage";
import EmployerHomePage from "../../pages/user/EmployerHomePage";
import CreateAccountPage from "../../pages/user/CreateAccountPage";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/home" element={<EmployerHomePage />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
