import { Route, Routes } from "react-router-dom";
import ProviderHome from "../../pages/provider/ProviderHome";
import SimWaitingList from "../../components/user/home/SimWaitingList";
import UserProfile from "../../components/user/home/UserProfile";
import UserMessenger from "../../pages/messenger/UserMessenger";


const ProviderRouter = () => {
  return (
    <div>
      <Routes>
            <Route path="/home" element={<ProviderHome/>} />
            <Route path="/*" element={<ProviderHome/>} />
      </Routes>
    </div>
  );
};

export default ProviderRouter;
