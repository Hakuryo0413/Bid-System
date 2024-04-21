import { Route, Routes } from "react-router-dom";
import ProviderListPage from "../../pages/admin/ProviderListPage";
import UserListPage from "../../pages/admin/UserListPage";
import ListOfSimsPage from "../../pages/auction/ListOfSimsPage";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
      <Route path="/providerList" element={<ProviderListPage />} />
      <Route path="/userList" element={<UserListPage />} />
      <Route path="/sim/list" element={<ListOfSimsPage />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
