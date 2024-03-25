import CompletedAuction from "./CompletedAuction";
import HappeningAuction from "./HappeningAuction";

export default function HappeningAuctionList() {
    return (
    <div className="px-8">
      <p className="flex py-4 mx-[2.5%] text-white text-[20px] font-bold">
        Phiên đấu giá đang diễn ra
      </p>
      <div className="grid md:grid-cols-2">
        <HappeningAuction />
        <HappeningAuction />
        <HappeningAuction />
      </div>
    </div>
  );
}