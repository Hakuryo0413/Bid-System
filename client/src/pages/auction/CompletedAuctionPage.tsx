
import CompletedAuctionList from "../../components/auction/CompletedAuctionList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";

function CompletedAuctionListPage() {
    return (
      <div>
          <AdminHeader />
          <CompletedAuctionList />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default CompletedAuctionListPage;