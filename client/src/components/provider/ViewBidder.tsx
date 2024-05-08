import React, { useEffect, useState } from "react";
import { RoomInterface } from "../../types/RoomInterface";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import CompletedAuction from "../auction/CompletedAuction";
import HappeningAuction from "../auction/HappeningAuction";
import ParticipantsList from "../auction/ParticipantsList";
import ParticipantsListSmall from "../auction/ParticipantsListSmall";
import UpCommingAuction from "../auction/UpcommingAuction";
import { calcTime, calcTimeInSeconds } from "../auction/utils/format";

interface ViewBidderProps {
    code: string;
}
  
const ViewBidder: React.FC<ViewBidderProps> = ({ code }) => {

  const isLargeScreen = window.innerWidth >= 768;

  const [ViewBidder, setViewBidder] = useState<RoomInterface>(); // State để lưu trữ mã vận đơn
  const [hasError, setHasError] = useState(false); // State để kiểm tra lỗi
  const [timeDisplay, setTimeDisplay] = useState<{ days: number, hours: number, minutes: number, seconds: number }>(
    calcTime(ViewBidder?.start_at ?? new Date())
  );

  
  useEffect(() => {
    const userInfo = async () => {
      try {
        const data = await getRoomByCode(code);
        setViewBidder(data);
        setHasError(false);
      }
      catch (error) {
        setViewBidder(undefined);
        setHasError(true);
      }
    };
    userInfo();
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [filteredAuction, setFilteredOrders] = useState([...ViewBidder?.participants ?? []]);

  const handleSearch = (query: string) => {
    if(!ViewBidder || !ViewBidder.participants || query === '') {
      setFilteredOrders(filteredAuction ?? []);
      return;
    }
    const lowercaseQuery = query.toLowerCase();
    // Filter orders based on the search query
    const filtered = ViewBidder?.participants.filter(
      (participant) =>
        participant.email.toLowerCase().includes(lowercaseQuery) ||
        participant.name.toLowerCase().includes(lowercaseQuery) ||
        participant.phone.toLowerCase().includes(lowercaseQuery) ||
        participant.highest_price?.toString().toLowerCase().includes(lowercaseQuery) ||
        participant.status.toLocaleLowerCase().includes(lowercaseQuery)
    );
    setFilteredOrders(filtered);
  };

  const handleFilter = (filter: string) => {
    if(!ViewBidder || !ViewBidder.participants || filter === '') {
      setFilteredOrders(ViewBidder?.participants ?? []);
      return;
    }
    console.log(filter)
    if (filter === "Tất cả") {
      setFilteredOrders(ViewBidder.participants)
    } else {
      const filtered = ViewBidder.participants.filter(
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

  const updateCounters = () => setTimeDisplay(calcTime(ViewBidder?.start_at ?? new Date()));

  useEffect(() => {
      const intervalId = setInterval(() => {
          setTimeDisplay(calcTime(ViewBidder?.start_at ?? new Date()));
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
  }, [ViewBidder]);

  if (!ViewBidder) {
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
                <UpCommingAuction auctionDetails={ViewBidder} fromListPage={false}/>     
            ) : (
              calcTimeInSeconds(timeDisplay.days, timeDisplay.hours, timeDisplay.minutes, timeDisplay.seconds) < (ViewBidder?.time_limit ?? 0) * 60 ? (
                    <HappeningAuction auctionDetails={ViewBidder} fromHappeningList={false} />
                ) : (
                    <CompletedAuction auctionDetails={ViewBidder}/>
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
                  <ParticipantsList participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (ViewBidder.participants ?? []) : filteredAuction} code={code} />
                </div>
              ) : (
                <ParticipantsListSmall participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (ViewBidder.participants ?? []) : filteredAuction} code={code}/>
              )
            }
        </div>

    </div>
  );
};

export default ViewBidder