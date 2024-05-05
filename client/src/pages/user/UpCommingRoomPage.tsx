import SearchSim from "../../components/auction/SearchSim";
import UpCommingRoom from "../../components/auction/UpCommingRoom";
import UserSideFooter from "../../components/footer/UserSideFooter";
import CommonHeader from "../../components/header/CommonHeader";
import UserHeader from "../../components/header/UserHeader";

function UpCommingRoomPage() {
  return (
    <div>
      <UserHeader />
      <UpCommingRoom />
      <UserSideFooter />
    </div>
  );
}

export default UpCommingRoomPage;
