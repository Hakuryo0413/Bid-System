import { Route, Routes } from "react-router-dom";
import CreateAccountPage from "../../pages/home/CreateAccountPage";
import Notification from "../../pages/user/Notification";
import UserHomePage from "../../pages/user/UserHomePage";
import UserYeuCau from "../../components/user/home/UserYeuCau"; // Import the missing component
import UserMessenger from "../../pages/messenger/UserMessenger";
import SearchSimPage from "../../pages/home/SearchSimPage";
import UpCommingRoomPage from "../../pages/user/UpCommingRoomPage";
import HappeningAuctionListPage from "../../pages/user/HappeningAuctionListPage";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/notification" element={<Notification />} />
        <Route path="/*" element={<UserHomePage />} />
        <Route path="/happening" element={<HappeningAuctionListPage />} />

        {/* <Route path="/yeucau" element={<UserYeuCau />} /> */}
        <Route path="/auction-list" element={<SearchSimPage />} />
        <Route path="/upcomming" element={<UpCommingRoomPage />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
