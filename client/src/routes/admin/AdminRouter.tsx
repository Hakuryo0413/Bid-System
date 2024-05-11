import { Route, Routes } from "react-router-dom";

import CreateAccountPage from "../../pages/home/CreateAccountPage";
import Notification from "../../pages/user/Notification";

import UserHomePage from "../../pages/user/UserHomePage";
import UserYeuCau from "../../components/user/home/UserYeuCau"; // Import the missing component

import ProviderListPage from "../../pages/admin/ProviderListPage";
import UserListPage from "../../pages/admin/UserListPage";
import ListOfSimsPage from "../../pages/auction/ListOfSimsPage";
import AuctionListPage from "../../pages/admin/AuctionListPage";
// import Notification from "../../pages/user/Notification";
import NotificationAd from "../../pages/admin/NotificationAd";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
{/*         <Route path="/notification" element={<Notification />}></Route>
 */}
        <Route path="/auctionList" element={<AuctionListPage />} />
        <Route path="/providerList" element={<ProviderListPage />} />
        <Route path="/userList" element={<UserListPage />} />
        <Route path="/sim/list" element={<ListOfSimsPage />} />
        <Route path="/notification" element={<NotificationAd />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
