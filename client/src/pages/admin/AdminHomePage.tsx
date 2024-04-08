import ProviderList from "../../components/admin/ProviderList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";

function AdminHomPage() {
    return (
      <div>
          <AdminHeader />
          <ProviderList />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default AdminHomPage;