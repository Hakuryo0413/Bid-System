import { faSimCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ParticipantInterface, RoomInterface } from "../../types/RoomInterface";
import { formatDate, endTimeCalc, formatMoney, calcTime } from "./utils/format";
import { useEffect, useState } from "react";
import { successBidder } from "./utils/successParticipant";
import React from "react";

interface UpCommingAuctionProps {
    auctionDetails: RoomInterface;
    fromListPage: boolean;
}

const UpCommingAuction: React.FC<UpCommingAuctionProps> = ({ auctionDetails, fromListPage }) => {
    useEffect(() => {
        const fetchSuccessBidder = async () => {
          try {
            const result = await successBidder(auctionDetails?.participants ?? []);
            if (result) {
              setParticipant(result.successbidder); // Extract successbidder property from result
            } else {
              setParticipant(null); // Handle case where result is falsy (e.g., null or undefined)
            }
          } catch (error) {
            // Handle error if necessary
          }
        };
      
        fetchSuccessBidder();
      }, [auctionDetails]); // Dependency array ensures useEffect runs when auctionDetails changes
      
      // Define state to hold the result of successBidder
      const [participant, setParticipant] = useState<ParticipantInterface[] | null>(null);
    

    
    const [timeDisplay, setTimeDisplay] = React.useState<{ days: number, hours: number, minutes: number, seconds: number }>(
        calcTime(auctionDetails?.start_at || new Date())
    );
    
    const updateCounters = () => setTimeDisplay(calcTime(auctionDetails?.start_at || new Date()));
    
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeDisplay(calcTime(auctionDetails?.start_at || new Date()));
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    
    const href = `/auction/details/${auctionDetails.code}`;
    
    return (
    <div className="border-white border-2 py-4 px-8  rounded-lg bg-white bg-opacity-10 mb-4 mx-[5%]">
        <div className="lg:grid grid-cols-7 space-x-2">
        <div className="lg:col-span-1 flex justify-center">
          <FontAwesomeIcon icon={faSimCard} size="6x" className="hidden lg:block"/>
        </div>
        <div className="lg:col-span-6">
          <div className="grid lg:grid-cols-2">
              <p className="text-white mb-2">
                  <strong>Số điện thoại:</strong> {auctionDetails?.phone}
              </p>
              <p className="text-white mb-2">
                  <strong>Số người đăng ký tham gia: </strong>{auctionDetails?.participants?.length}
              </p>
          </div>

          <div className="grid lg:grid-cols-2">
              <p className="text-white mb-2">
                  <strong>Thời điểm bắt đầu: </strong> {formatDate(auctionDetails?.start_at ?? new Date())}
              </p>

              <p className="text-white mb-2">
                    <strong> Đếm ngược thời gian diễn ra: </strong>{-timeDisplay.days - 1} ngày {-timeDisplay.hours - 1} giờ {-timeDisplay.minutes - 1} phút {-timeDisplay.seconds} giây
              </p>
              
              

              
          </div>

          <div className="border-2 border-white mb-2"></div>

          <div className="grid lg:grid-cols-2 flex items-center">
            <p className="text-white mb-2 lg:mb-0">
                <strong>Giá khởi điểm: </strong>{formatMoney(auctionDetails.price ?? 0)}
            </p>
            {
              !fromListPage ? (
                <div className="flex lg:justify-end">
                </div>
              ) : (
                <div className="flex lg:justify-end">
                  <a href={href} className="w-full">
                    <button className="relative rounded w-full py-2 overflow-hidden group bg-white relative hover:bg-gradient-to-r hover:from-white hover:to-grey-300 text-background hover:ring-2 hover:ring-offset-2 hover:ring-grey-300 transition-all ease-out duration-300"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <span className="relative font-bold">Xem chi tiết</span>
                    </button>
                  </a>
                </div>
              )
            }
            

          </div>
        </div>
        
      </div>

      </div>
  );
}

export default UpCommingAuction;