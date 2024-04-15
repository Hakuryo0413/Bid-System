import HappeningAuctionList from "../../components/auction/HappeningAuctionList";
import SearchSim from "../../components/auction/SearchSim";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import CommonHeader from "../../components/header/CommonHeader";
import UserHeader from "../../components/header/UserHeader";

function SearchSimPage() {
    return (
      <div>
          <CommonHeader />
          <SearchSim />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default SearchSimPage;