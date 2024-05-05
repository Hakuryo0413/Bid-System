import SearchSim from "../../components/auction/SearchSim";
import StatisticRoom from "../../components/auction/StatisticRoom";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import CommonHeader from "../../components/header/CommonHeader";

function StatisticPage() {
  return (
    <div>
      <CommonHeader />
      <StatisticRoom />
      <UserSideFooter />
    </div>
  );
}

export default StatisticPage;
