import { Route, Routes } from "react-router-dom";
import CreateAccountPage from "../../pages/home/CreateAccountPage";
import Notification from "../../pages/user/Notification";
import UserHomePage from "../../pages/user/UserHomePage";
import UserYeuCau from "../../components/user/home/UserYeuCau"; // Import the missing component

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/notification" element = {<Notification/>}></Route>
        <Route path="/*" element={<UserHomePage />} />
        <Route path="/yeucau" element={<UserYeuCau />} /> // Use the imported component
       \
      </Routes>
    </div>
  );
};

export default UserRouter;
