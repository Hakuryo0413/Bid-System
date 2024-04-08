import { useState, useEffect } from "react";
import { getAllHistories } from "../../features/axios/api/room/RoomDetails";
import { RoomInterface } from "../../types/RoomInterface";
import CompletedAuction from "./CompletedAuction";
import HappeningAuction from "./HappeningAuction";
import { calcTime, calcTimeInSeconds } from "./utils/format";

export default function HappeningAuctionList() {
  const [allAuctions, setAllAuctions] = useState<RoomInterface []>();
  const [happeningAuctions, sethappeningAuctions] = useState<RoomInterface[]>();

  useEffect(() => {
    const auctionsInfor = async () => {
      try {
        const data = await getAllHistories();
        setAllAuctions(data);
      }
      catch (error) {
        setAllAuctions(undefined);
      }
    };
    auctionsInfor();
  }, []);

  useEffect(() => {
    const happeningAuctionsInfor = async () => {
      if(allAuctions && allAuctions.length > 0) {
        let happeningAuction: RoomInterface[] = []
        for (let i = 0; i< allAuctions.length; i++) {
          let time_intervals = calcTime(allAuctions[i].start_at ?? new Date)
          let auctions_time_limit_in_seconds = (allAuctions[i].time_limit ?? 0) * 60;
          let auctions_intervals_in_seconds = calcTimeInSeconds(time_intervals.days, time_intervals.hours, time_intervals.minutes, time_intervals.seconds)
          if (auctions_intervals_in_seconds > 0 && auctions_intervals_in_seconds < auctions_time_limit_in_seconds) {
            happeningAuction.push(allAuctions[i])
          }
        }
        console.log(happeningAuction)
        sethappeningAuctions(happeningAuction)
      }
      else {
        sethappeningAuctions(undefined)
      }
    };
    happeningAuctionsInfor();
  }, [allAuctions]);



    return (
    <div className="px-8">
      <p className="flex py-4 mx-[2.5%] text-white text-[20px] font-bold">
        Phiên đấu giá đang diễn ra
      </p>
      <div className="grid md:grid-cols-2">
        {
          happeningAuctions?.map((auction) => (
            <div>
              <HappeningAuction auctionDetails={auction} fromHappeningList={true}></HappeningAuction>
            </div>
          ))
        }
      </div>
    </div>
  );
}