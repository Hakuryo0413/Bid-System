import React, { useEffect, useState } from "react";
import { RoomInterface } from "../../types/RoomInterface";
import ParticipantsList from "./ParticipantsList";
import HappeningAuction from "./HappeningAuction";
import CompletedAuction from "./CompletedAuction";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import { calcTime, calcTimeInSeconds, formatMoney } from "./utils/format";
import UpCommingAuction from "./UpcommingAuction";
import ParticipantsListSmall from "./ParticipantsListSmall";
import { SimInterface } from "../../types/SimInterface";
import { getSimByNumber } from "../../features/axios/api/sim/SimDetails";

interface AuctionInforProps {
    code: string;
}
  
const AuctionInfor: React.FC<AuctionInforProps> = ({ code }) => {

  const isLargeScreen = window.innerWidth >= 768;

  const [AuctionInfor, setAuctionInfor] = useState<RoomInterface>(); // State để lưu trữ mã vận đơn
  const [hasError, setHasError] = useState(false); // State
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
        participant.highest_price?.toString().toLowerCase().includes(lowercaseQuery) ||
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
      return <div className="min-h-screen flex items-center justify-center">
          <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
        </div>;
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
                    <CompletedAuction auctionDetails={AuctionInfor} fromHappeningList={false}/>
                )
            )}

            </div>
            
        </div>

        <div className="pt-4">
            <p className="flex py-4  text-white text-[20px] font-bold">
              {calcTimeInSeconds(timeDisplay.days, timeDisplay.hours, timeDisplay.minutes, timeDisplay.seconds) > 0
              ? 'Danh sách người tham gia'
              :"Danh sách người đăng ký tham gia"
              }
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
                  {calcTimeInSeconds(timeDisplay.days, timeDisplay.hours, timeDisplay.minutes, timeDisplay.seconds) > 0
                  ? <ParticipantsList participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (AuctionInfor.participants ?? []) : filteredAuction} code={code} isHappening={true}/>
                  :<ParticipantsList participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (AuctionInfor.participants ?? []) : filteredAuction} code={code} isHappening={false}/>
                  }
                </div>
              ) : (
                <div>
                  {calcTimeInSeconds(timeDisplay.days, timeDisplay.hours, timeDisplay.minutes, timeDisplay.seconds) > 0
                  ? <ParticipantsListSmall participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (AuctionInfor.participants ?? []) : filteredAuction} code={code} isHappening={true}/>
                  :<ParticipantsListSmall participants={(filteredAuction.length === 0 && searchQuery === '' && filter === '') ? (AuctionInfor.participants ?? []) : filteredAuction} code={code} isHappening={false}/>
                  }
                </div>
                
              )
            }
        </div>

    </div>
  );
};

export default AuctionInfor