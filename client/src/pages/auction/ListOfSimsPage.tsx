import SearchSim from "../../components/auction/SearchSim";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";

function ListOfSimsPage() {
    return (
      <div>
          <AdminHeader />
          <SearchSim />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default ListOfSimsPage;