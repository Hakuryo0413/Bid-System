import { useState, useEffect } from "react";
import { ParticipantInterface, RoomInterface } from "../../types/RoomInterface";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSimCard } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatMoney, endTimeCalc } from "./utils/format";
import { successBidder } from "./utils/successParticipant";

interface CompletedAuctionProps {
    auctionDetails: RoomInterface;
}
const CompletedAuction: React.FC<CompletedAuctionProps> = ({ auctionDetails }) => {
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

    return (
    <div className="border-white border-2 py-4 pr-4 pl-4 lg:pl-0 text-[15px] rounded-lg bg-white bg-opacity-10 mb-4 mx-[5%]">
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
                  <strong> Thời điểm kết thúc: </strong>{formatDate(endTimeCalc(auctionDetails?.start_at || new Date(), auctionDetails?.time_limit || 0))}
              </p>
          </div>

          <div className="border-2 border-white mb-2"></div>

          <div className="grid lg:grid-cols-2">
          <p className="text-white my-2 lg:my-0">
              <strong>Người đấu giá thành công: </strong>{successfulBidder?.name}
          </p>
          <p className="text-white">
              <strong>Giá cao nhất: </strong>{formatMoney(successfulBidder?.highest_price ?? 0)}
          </p>
              

          </div>
        </div>
        
      </div>

        
        
        

        
      </div>
  );
}

export default CompletedAuction;