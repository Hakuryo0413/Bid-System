import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import HomeRouter from "./routes/home/HomeRouter";
import NotFound from "./components/error/NotFound";
import AuctionRouter from "./routes/auction/AuctionRouter";
import AdminRouter from "./routes/admin/AdminRouter";
import TestRouter from "./routes/test/testRouter";
import ProviderRouter from "./routes/provider/ProviderRoute";

function App() {
  return (
    <div className="font-priego text-sm md:text-md bg-background min-h-screen">
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRouter />} />
          <Route path="/user/*" element={<UserRouter />} />
          <Route path="/auction/*" element={<AuctionRouter/>} />
          <Route path="/admin/*" element={<AdminRouter/>} />
          <Route path='/provider/*' element={<ProviderRouter />} />
          <Route path="/test/*" element={<TestRouter/>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
