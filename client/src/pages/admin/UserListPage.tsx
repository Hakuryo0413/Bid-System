import ProviderList from "../../components/admin/ProviderList";
import UserList from "../../components/admin/UserList";
import HappeningAuctionList from "../../components/auction/HappeningAuctionList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import CommonHeader from "../../components/header/CommonHeader";
import UserHeader from "../../components/header/UserHeader";

function UserListPage() {
    return (
      <div>
          <AdminHeader />
          <UserList />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default UserListPage;