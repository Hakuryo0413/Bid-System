import SearchSim from "../../components/auction/SearchSim";
import StatisticRoom from "../../components/auction/StatisticRoom";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import CommonHeader from "../../components/header/CommonHeader";
import ProviderHeader from "../../components/header/ProviderHeader";

function StatisticPage() {
  return (
    <div>
      <ProviderHeader />
      <StatisticRoom />
      <UserSideFooter />
    </div>
  );
}

export default StatisticPage;
