import { Route, Routes } from "react-router-dom";
import CreateAccountPage from "../../pages/home/CreateAccountPage";

import UserHomePage from "../../pages/user/UserHomePage";
import UserYeuCau from "../../components/user/home/UserYeuCau"; // Import the missing component
import ProviderListPage from "../../pages/admin/ProviderListPage";
import UserListPage from "../../pages/admin/UserListPage";
import AdminHomPage from "../../pages/admin/AdminHomePage";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
      <Route path="/providerList" element={<ProviderListPage />} />
      <Route path="/userList" element={<UserListPage />} />
      <Route path="/home" element={<AdminHomPage/>} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
