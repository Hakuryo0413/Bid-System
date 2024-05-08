import React from "react";
import AdminHeader from "../../components/header/AdminHeader";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AuctionInfor from "../../components/auction/AuctionInfor";
import ProviderHeader from "../../components/header/ProviderHeader";
import ViewBidder from "../../components/provider/ViewBidder";
import { useParams } from "react-router-dom";

const ViewBidderInforPage: React.FC = () => {
  const params = useParams();
  const { code } = params;

  return (
    <div>
      <ProviderHeader />
      <ViewBidder code={code ?? ""} />
      <UserSideFooter />
    </div>
  );
};

export default ViewBidderInforPage;
