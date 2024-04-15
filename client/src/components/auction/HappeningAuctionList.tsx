import { useState, useEffect } from "react";
import { getAllHistories } from "../../features/axios/api/room/RoomDetails";
import { RoomInterface } from "../../types/RoomInterface";
import CompletedAuction from "./CompletedAuction";
import HappeningAuction from "./HappeningAuction";
import { calcTime, calcTimeInSeconds } from "./utils/format";
import AuctionInfor from "./AuctionInfor";

export default function HappeningAuctionList() {
  const [allAuctions, setAllAuctions] = useState<RoomInterface []>();
  const [happeningAuctions, sethappeningAuctions] = useState<RoomInterface[]>();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredAuction, setFilteredOrders] = useState([...happeningAuctions ?? []]);

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

  
  const handleSearch = (query: string) => {
    if(!happeningAuctions || query === '') {
      setFilteredOrders(happeningAuctions ?? []);
      return;
    }

    
    const lowercaseQuery = query.toLowerCase();
    // Filter orders based on the search query
    const filtered = happeningAuctions.filter(
      (auction) =>
        auction.phone?.toLowerCase().includes(lowercaseQuery) ||
        auction.price?.toString().toLowerCase().includes(lowercaseQuery)
    );
    setFilteredOrders(filtered);
    console.log(query, filteredAuction)
  };



    return (
    <div className="px-8">
      <p className="flex py-4 mx-[2.5%] text-white text-[20px] font-bold">
        Phiên đấu giá đang diễn ra
      </p>
      <div className="flex justify-center pb-4 mx-[2.5%]">
          <input type="text" className="bg-background lg:w-[60%] w-full rounded-lg px-4 py-2 border-2 border-white placeholder-gray-600 text-white"
                  placeholder="Nhập số sim hoặc nhà cung cấp cần tìm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);}
          }/>
      </div>
      <div className="grid md:grid-cols-2">
        {searchQuery === '' ? 
          (
            happeningAuctions?.map((auction) => (
              <div>
                <HappeningAuction auctionDetails={auction} fromHappeningList={true}></HappeningAuction>
              </div>
            ))
          )
       : (
          filteredAuction?.map((auction) => (
            <div>
              <HappeningAuction auctionDetails={auction} fromHappeningList={true}></HappeningAuction>
            </div>
          ))
       )}
      </div>
    </div>
  );
}