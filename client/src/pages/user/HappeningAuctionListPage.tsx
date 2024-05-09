import HappeningAuctionList from "../../components/auction/HappeningAuctionList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import UserHeader from "../../components/header/UserHeader";

function HappeningAuctionListPage() {
  return (
    <div>
      <UserHeader />
      <HappeningAuctionList />
      <UserSideFooter />
    </div>
  );
}

export default HappeningAuctionListPage;
