import { Route, Routes, useParams } from "react-router-dom";
import AuctionInforPage from "../../pages/auction/AuctionInforPage";
import HappeningAuctionListPage from "../../pages/auction/HappeningAuctionListPage";
import HistoryAuction from "../../pages/auction/HistoryAuctionPage";
import UpCommingAuctionListPage from "../../pages/auction/UpcommingAuctionListPage";
import SearchSimPage from "../../pages/auction/ListOfSimsPage";
import CompletedAuctionListPage from "../../pages/auction/CompletedAuctionPage";
function AuctionInforPageWrapper() {
  const { code } = useParams();
  const codeValue = code || "";
  return <AuctionInforPage code={codeValue} />;
}

const AuctionRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/details/:code" element={<AuctionInforPageWrapper />} />
        <Route path="/happening" element={<HappeningAuctionListPage />} />
        <Route path="/upcomming" element={<UpCommingAuctionListPage />} />
        <Route path="/search" element={<SearchSimPage />} />
        <Route path="/history" element={<HistoryAuction />} />
        <Route path="/completed" element={<CompletedAuctionListPage />} />
      </Routes>
    </div>
  );
};

export default AuctionRouter;
