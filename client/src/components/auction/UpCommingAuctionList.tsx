import { useState, useEffect } from "react";
import { getAllHistories } from "../../features/axios/api/room/RoomDetails";
import { RoomInterface } from "../../types/RoomInterface";
import { calcTime, calcTimeInSeconds } from "./utils/format";
import UpCommingAuction from "./UpcommingAuction";

export default function UpommingAuctionList() {
  const [allAuctions, setAllAuctions] = useState<RoomInterface []>();
  const [upommingAuctions, setUpommingAuctions] = useState<RoomInterface[]>();

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
    const upommingAuctionsInfor = async () => {
      if(allAuctions && allAuctions.length > 0) {
        let upommingAuction: RoomInterface[] = []
        for (let i = 0; i < allAuctions.length; i++) {
          let time_intervals = calcTime(allAuctions[i].start_at ?? new Date)
          let auctions_intervals_in_seconds = calcTimeInSeconds(time_intervals.days, time_intervals.hours, time_intervals.minutes, time_intervals.seconds)
          if (auctions_intervals_in_seconds < 0 && (allAuctions[i].state !== "Chờ xóa" && allAuctions[i].state !== "Đã xoá")) {
            upommingAuction.push(allAuctions[i])
          }
        }
        console.log(upommingAuction)
        setUpommingAuctions(upommingAuction)
      }
      else {
        setUpommingAuctions(undefined)
      }
    };
    upommingAuctionsInfor();
  }, [allAuctions]);



    return (
    <div className="px-8">
      <p className="flex py-4 mx-[2.5%] text-white text-[20px] font-bold">
        Phiên đấu giá sắp diễn ra
      </p>
      <div className="grid md:grid-cols-2">
        {
          upommingAuctions?.map((auction) => (
            <div>
              <UpCommingAuction auctionDetails={auction} fromListPage={true}></UpCommingAuction>
            </div>
          ))
        }
      </div>
    </div>
  );
}