import { Route, Routes, useParams } from "react-router-dom";
import AuctionInforPage from "../../pages/auction/AuctionInforPage";
import HappeningAuctionListPage from "../../pages/auction/HappeningAuctionListPage";
import HistoryAuction from "../../pages/auction/HistoryAuctionPage";
import SearchAuctionPage from "../../pages/auction/SearchAuctionPage";
function AuctionInforPageWrapper() {
    const { code } = useParams();
    const codeValue = code || '';
    return <AuctionInforPage code={codeValue} />;
  }

  
  const AuctionRouter = () => {
    return (
      <div>
        <Routes>
          <Route path="/details/:code" element={<AuctionInforPageWrapper/>} />
          <Route path="/happening" element={<HappeningAuctionListPage/>} />
          <Route path="/search" element={<SearchAuctionPage/>} />
          <Route path='/history' element={<HistoryAuction/>}/>
        </Routes>
      </div>
    );
  };
  
  export default AuctionRouter;