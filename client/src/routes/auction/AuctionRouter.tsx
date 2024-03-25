import { Route, Routes, useParams } from "react-router-dom";
import AuctionInforPage from "../../pages/auction/AuctionInforPage";
import HappeningAuctionListPage from "../../pages/auction/HappeningAuctionListPage";

function AuctionInforPageWrapper() {
    const { code } = useParams();
    const codeValue = code || '';
    return <AuctionInforPage code={codeValue} />;
  }

  const AuctionRouter = () => {
    return (
      <div>
        <Routes>
          <Route path="/details" element={<AuctionInforPageWrapper/>} />
          <Route path="/happening" element={<HappeningAuctionListPage/>} />
        </Routes>
      </div>
    );
  };
  
  export default AuctionRouter;