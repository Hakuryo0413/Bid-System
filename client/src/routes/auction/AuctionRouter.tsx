import { Route, Routes, useParams } from "react-router-dom";
import AuctionInforPage from "../../pages/auction/AuctionInforPage";

function AuctionInforPageWrapper() {
    const { code } = useParams();
    const codeValue = code || '';
    return <AuctionInforPage code={codeValue} />;
  }

  const AuctionRouter = () => {
    return (
      <div>
        <Routes><Route path="/details" element={<AuctionInforPageWrapper/>} />
        </Routes>
      </div>
    );
  };
  
  export default AuctionRouter;