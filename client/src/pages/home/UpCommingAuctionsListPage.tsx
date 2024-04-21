import UpCommingAuctionList from "../../components/auction/UpCommingAuctionList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import CommonHeader from "../../components/header/CommonHeader";

function UpCommingAuctionListPage() {
    return (
      <div>
          <CommonHeader/>
          <UpCommingAuctionList />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default UpCommingAuctionListPage;