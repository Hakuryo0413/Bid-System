import HappeningAuctionList from "../../components/auction/HappeningAuctionList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";

function HappeningAuctionListPage() {
    return (
      <div>
          <AdminHeader />
          <HappeningAuctionList />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default HappeningAuctionListPage;