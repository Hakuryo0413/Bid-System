import { Routes, Route } from "react-router-dom";
import UserSideFooter from "../../components/footer/UserSideFooter";
import ProviderHeader from "../../components/header/ProviderHeader";
import Sidenav from "../../components/side-nav/SideNav";
import SimWaitingList from "../../components/user/home/SimWaitingList";
import UserProfile from "../../components/user/home/UserProfile";
import UserMessenger from "../messenger/UserMessenger";
import { ProviderNav } from "../../context/ProviderNav";
import ViewBidder from "../../components/provider/ViewBidder";

function ProviderHome() {
  return (
    <div>
      <ProviderHeader />
      <div className="grid-cols-5">
        <div className="flex col-span-1">
          <div className="w-1/5">
            <Sidenav routes={ProviderNav} />
          </div>

          <div className="w-4/5 pl-6 pr-6">
            <Routes>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/waiting_list" element={<SimWaitingList />} />

              <Route path="/messager" element={<UserMessenger />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderHome;
