import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
=======
import CreateAccountPage from "../../pages/home/CreateAccountPage";

import UserHomePage from "../../pages/user/UserHomePage";
import UserYeuCau from "../../components/user/home/UserYeuCau"; // Import the missing component
>>>>>>> 9cf2cd404c3b1a2757c2aa577bea827ef1153761
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
