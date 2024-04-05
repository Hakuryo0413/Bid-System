import { Route, Routes } from "react-router-dom";
import CreateAccountPage from "../../pages/home/CreateAccountPage";

import UserHomePage from "../../pages/user/UserHomePage";
import UserYeuCau from "../../pages/user/UserYeuCau"; // Import the missing component
import ProviderListPage from "../../pages/admin/ProviderListPage";
import UserListPage from "../../pages/admin/UserListPage";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
      <Route path="/providerList" element={<ProviderListPage />} />
      <Route path="/userList" element={<UserListPage />} />

      </Routes>
    </div>
  );
};

export default AdminRouter;
