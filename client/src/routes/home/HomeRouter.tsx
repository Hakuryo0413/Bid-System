import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";

import UserLoginPage from "../../pages/home/UserLoginPage";
import CreateAccountPage from "../../pages/home/CreateAccountPage";
import CreateCaNhanPage from "../../pages/home/CreateCaNhanPage";
import CreateToChucPage from "../../pages/home/CreateToChucPage";
import UpCommingAuctionListPage from "../../pages/home/UpCommingAuctionsListPage";
import SearchSimPage from "../../pages/home/SearchSimPage";
import StatisticPage from "../../pages/auction/StatisticPage";

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/signup/canhan" element={<CreateCaNhanPage />} />
        <Route path="/signup/tochuc" element={<CreateToChucPage />} />
        <Route path="/auction-list" element={<SearchSimPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route
          path="/upcomming-auction-list"
          element={<UpCommingAuctionListPage />}
        />
      </Routes>
    </div>
  );
}

export default HomeRouter;
