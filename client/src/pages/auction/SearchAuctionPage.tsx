import HappeningAuctionList from "../../components/auction/HappeningAuctionList";
import SearchAuction from "../../components/auction/SearchAuction";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import CommonHeader from "../../components/header/CommonHeader";
import UserHeader from "../../components/header/UserHeader";

function SearchAuctionPage() {
    return (
      <div>
          <CommonHeader />
          <SearchAuction />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default SearchAuctionPage;