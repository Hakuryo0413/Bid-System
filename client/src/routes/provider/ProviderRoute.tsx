import { Route, Routes, useParams } from "react-router-dom";
import ProviderHome from "../../pages/provider/ProviderHome";

import StatisticPage from "../../pages/auction/StatisticPage";

import ViewBidderInforPage from "../../pages/auction/ViewBidderPage";
import Notification from "../../pages/user/Notification";

const ProviderRouter = () => {
  return (
    <div>
      <Routes>
        {/*         <Route path="/notification" element={<Notification />} />
         */}{" "}
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/home" element={<ProviderHome />} />
        <Route path="/*" element={<ProviderHome />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path={`/auction/:code`} element={<ViewBidderInforPage />} />
      </Routes>
    </div>
  );
};

export default ProviderRouter;
