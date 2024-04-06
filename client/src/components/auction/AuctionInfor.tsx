import React, { useEffect, useState } from "react";
import { RoomInterface } from "../../types/RoomInterface";
import ParticipantsList from "./ParticipantsList";
import HappeningAuction from "./HappeningAuction";
import CompletedAuction from "./CompletedAuction";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import { calcTime, calcTimeInSeconds, formatMoney } from "./utils/format";
import UpCommingAuction from "./UpcommingAuction";
import ParticipantsListSmall from "./ParticipantsListSmall";

interface AuctionInforProps {
    code: string;
}
  
const AuctionInfor: React.FC<AuctionInforProps> = ({ code }) => {

  const isLargeScreen = window.innerWidth >= 768;

  const [AuctionInfor, setAuctionInfor] = useState<RoomInterface>(); // State để lưu trữ mã vận đơn
  const [hasError, setHasError] = useState(false); // State để kiểm tra lỗi
  const [timeDisplay, setTimeDisplay] = useState<{ days: number, hours: number, minutes: number, seconds: number }>(
    calcTime(AuctionInfor?.start_at ?? new Date())
  );

  
  useEffect(() => {
    const userInfo = async () => {
      try {
        const data = await getRoomByCode(code);
        setAuctionInfor(data);
        setHasError(false);
      }
      catch (error) {
        setAuctionInfor(undefined);
        setHasError(true);
      }
    };
    userInfo();
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [filteredAuction, setFilteredOrders] = useState([...AuctionInfor?.participants ?? []]);

  const handleSearch = (query: string) => {
    if(!AuctionInfor || !AuctionInfor.participants || query === '') {
      setFilteredOrders(filteredAuction ?? []);
      return;
    }
    const lowercaseQuery = query.toLowerCase();
    // Filter orders based on the search query
    const filtered = AuctionInfor?.participants.filter(
      (participant) =>
        participant.email.toLowerCase().includes(lowercaseQuery) ||
        participant.name.toLowerCase().includes(lowercaseQuery) ||
        participant.phone.toLowerCase().includes(lowercaseQuery) ||
        participant.highest_price.toString().toLowerCase().includes(lowercaseQuery) ||
        participant.status.toLocaleLowerCase().includes(lowercaseQuery)
    );
    setFilteredOrders(filtered);
  };

  const handleFilter = (filter: string) => {
    if(!AuctionInfor || !AuctionInfor.participants || filter === '') {
      setFilteredOrders(AuctionInfor?.participants ?? []);
      return;
    }
    console.log(filter)
    if (filter === "Tất cả") {
      setFilteredOrders(AuctionInfor.participants)
    } else {
      const filtered = AuctionInfor.participants.filter(
        (participant) =>
          participant.status.toLowerCase() === filter.toLowerCase()
      );
      setFilteredOrders(filtered);
    }
  };


  useEffect(() => {
    // Simulate delay of 2 seconds before executing some initialization code
    setTimeout(() => {
        // Initialization code to execute after the delay
        console.log('Initialization code executed after delay');
    }, 2000);
  }, []);

  const updateCounters = () => setTimeDisplay(calcTime(AuctionInfor?.start_at ?? new Date()));

  useEffect(() => {
      const intervalId = setInterval(() => {
          setTimeDisplay(calcTime(AuctionInfor?.start_at ?? new Date()));
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
  }, [AuctionInfor]);

  if (!AuctionInfor) {
      return <div className="flex px-[10%] h-screen lg:py-4 py-4 text-white text-[20px] font-bold">Loading...</div>;
  }

  

  return (
    <div className="bg-background px-[10%] pb-8 flex-grow">
        <div>
            <p className="flex lg:py-4 py-4 text-white text-[20px] font-bold">
                Thông tin đấu giá
            </p>

            <div className="mx-0 ">
            {calcTimeInSeconds(timeDisplay.days, timeDisplay.hours, timeDisplay.minutes, timeDisplay.seconds) <= 0 ? (
                <UpCommingAuction auctionDetails={AuctionInfor} fromListPage={false}/>     
            ) : (
              calcTimeInSeconds(timeDisplay.days, timeDisplay.hours, timeDisplay.minutes, timeDisplay.seconds) < (AuctionInfor?.time_limit ?? 0) * 60 ? (
                    <HappeningAuction auctionDetails={AuctionInfor} fromHappeningList={false} />
                ) : (
                    <CompletedAuction auctionDetails={AuctionInfor}/>
                )
            )}

            </div>
            
        </div>

        <div className="pt-4">
            <p className="flex py-4  text-white text-[20px] font-bold">
                Danh sách người tham gia
            </p>

            <div className="flex justify-end pb-4">
                <input type="text" className="bg-background lg:w-[40%] w-full rounded-lg px-4 py-2 border-2 border-white placeholder-gray-600 text-white"
                        placeholder="Nhập thông tin cần tìm"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          handleSearch(e.target.value);}
                }/>
            </div>

            {
              isLargeScreen ? (
                <div className="border-white text-black border-2 py-4 px-4 pb-10 rounded-lg bg-white">
                  <ParticipantsList participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (AuctionInfor.participants ?? []) : filteredAuction} code={code} />
                </div>
              ) : (
                <ParticipantsListSmall participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (AuctionInfor.participants ?? []) : filteredAuction} code={code}/>
              )
            }
            



        </div>

    </div>
  );
};

export default AuctionInfor