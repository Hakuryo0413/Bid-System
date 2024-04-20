import SearchSim from "../../components/auction/SearchSim";
import UserSideFooter from "../../components/footer/UserSideFooter";
import CommonHeader from "../../components/header/CommonHeader";

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