import { useState, useEffect } from "react";
import { getAllHistories } from "../../features/axios/api/room/RoomDetails";
import { RoomInterface } from "../../types/RoomInterface";
import CompletedAuction from "./CompletedAuction";
import HappeningAuction from "./HappeningAuction";
import { calcTime, calcTimeInSeconds } from "./utils/format";
import AuctionInfor from "./AuctionInfor";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import { userInterface } from "../../types/UserInterface";

export default function HappeningAuctionList() {
  const [allAuctions, setAllAuctions] = useState<RoomInterface []>();
  const [happeningAuctions, sethappeningAuctions] = useState<RoomInterface[]>();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredAuction, setFilteredOrders] = useState([...happeningAuctions ?? []]);

  const [accountDetails, setAccountDetails] = useState<userInterface>();
  const getAccountDetails = async () => {
    const data = await accountData();
    setAccountDetails(data);
  };

  useEffect(() => {
    setTimeout(() => {
      if (true) {
        // Gọi employerDetails() để cập nhật dữ liệu
        getAccountDetails();
      }
    }, 2000);
  }, []);

  console.log(accountDetails?.role)
  
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
          console.log(auctions_intervals_in_seconds, auctions_time_limit_in_seconds)
          if (auctions_intervals_in_seconds > 0 && auctions_intervals_in_seconds < auctions_time_limit_in_seconds && allAuctions[i].state !== "Chờ xóa" && allAuctions[i].state !== "Đã xoá" && allAuctions[i].state != 'Chờ duyệt') {
            if(accountDetails?.role === 'user') {
              if (allAuctions[i] && allAuctions[i].participants) {
                let par = allAuctions[i].participants ?? [];
                for (let j = 0; j < par.length; j++) {
                  if(par[j].email === accountDetails?.email) {
                    happeningAuction.push(allAuctions[i])
                    continue
                  }
                }
              }
            } else if (accountDetails?.role === 'provider' || accountDetails?.role === 'admin') {
              happeningAuction.push(allAuctions[i])
            }
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
  }, [allAuctions, accountDetails]);

  
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