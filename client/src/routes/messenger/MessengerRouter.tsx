import { Route, Routes } from "react-router-dom";
import MessengerPage from "../../pages/messenger/UserMessenger";

const MessengerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/user" element={<MessengerPage/>} />
      </Routes>
    </div>
  );
};

export default MessengerRouter;
