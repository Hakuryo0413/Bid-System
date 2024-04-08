import UpCommingAuctionList from "../../components/auction/UpCommingAuctionList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";

function UpCommingAuctionListPage() {
    return (
      <div>
          <AdminHeader />
          <UpCommingAuctionList />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default UpCommingAuctionListPage;