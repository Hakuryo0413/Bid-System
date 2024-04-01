import { faSimCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ParticipantInterface, RoomInterface } from "../../types/RoomInterface";
import { formatDate, endTimeCalc, formatMoney, calcTime } from "./utils/format";
import { useEffect, useState } from "react";
import { successBidder } from "./utils/successParticipant";
import React from "react";

interface UpCommingAuctionProps {
    auctionDetails: RoomInterface;
}

const UpCommingAuction: React.FC<UpCommingAuctionProps> = ({ auctionDetails }) => {
    useEffect(() => {
        const fetchSuccessBidder = async () => {
          try {
            const result = await successBidder(auctionDetails?.participants ?? []);
            if (result) {
              setSuccessfulBidder(result.successbidder); // Extract successbidder property from result
            } else {
              setSuccessfulBidder(null); // Handle case where result is falsy (e.g., null or undefined)
            }
          } catch (error) {
            // Handle error if necessary
          }
        };
      
        fetchSuccessBidder();
      }, [auctionDetails]); // Dependency array ensures useEffect runs when auctionDetails changes
      
      // Define state to hold the result of successBidder
      const [successfulBidder, setSuccessfulBidder] = useState<ParticipantInterface | null>(null);
    

    
    const [timeDisplay, setTimeDisplay] = React.useState<{ days: number, hours: number, minutes: number, seconds: number }>(
        calcTime(endTimeCalc(auctionDetails?.start_at || new Date(), auctionDetails?.time_limit || 0))
    );
    
    const updateCounters = () => setTimeDisplay(calcTime(endTimeCalc(auctionDetails?.start_at || new Date(), auctionDetails?.time_limit || 0)));
    
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeDisplay(calcTime(endTimeCalc(auctionDetails?.start_at || new Date(), auctionDetails?.time_limit || 0)));
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    
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
                  <strong>Số người tham gia: </strong>{auctionDetails?.participants?.length}
              </p>
          </div>

          <div className="grid lg:grid-cols-2">
              <p className="text-white mb-2">
                  <strong>Thời điểm bắt đầu: </strong> {formatDate(auctionDetails?.start_at ?? new Date())}
              </p>

              <p className="text-white mb-2">
                    <strong> Đếm ngược thời gian diễn ra: </strong>{-timeDisplay.days} ngày {-timeDisplay.hours} giờ {-timeDisplay.minutes} phút {-timeDisplay.seconds} giây
              </p>
              
              

              
          </div>

          <div className="border-2 border-white mb-2"></div>

          <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2 lg:mb-0">
                <strong>Giá khởi điểm: </strong>{formatMoney(auctionDetails.price ?? 0)}
            </p>
            
            <div className="flex lg:justify-end">
                <button
                type="submit"
                className="text-black font-bold p-2 w-full lg:w-[50] items-center bg-white rounded-lg hover:bg-gray-300 hover:bg-opacity-50"
                >
                <a href="/auction/details">Đăng ký tham gia đấu giá</a>
                </button>
            </div>

          </div>
        </div>
        
      </div>

      </div>
  );
}

export default UpCommingAuction;