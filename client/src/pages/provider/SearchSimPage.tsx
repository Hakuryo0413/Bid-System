import SearchSim from "../../components/auction/SearchSim";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import ProviderHeader from "../../components/header/ProviderHeader";

function ListOfSimsPage() {
  return (
    <div>
      <ProviderHeader />
      <SearchSim />
      <UserSideFooter />
    </div>
  );
}

export default ListOfSimsPage;
