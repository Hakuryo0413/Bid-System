import { useState, useEffect } from "react";
import { RoomInterface } from "../../types/RoomInterface";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";

interface CompletedAuctionProps {
    code: string,
}
const CompletedAuction: React.FC<CompletedAuctionProps> = ({ code }) => {
  const [auctionDetails, setAuctionDetails] = useState<RoomInterface>(); // State để lưu trữ mã vận đơn
  const [hasError, setHasError] = useState(false); // State để kiểm tra lỗi

  console.log(code);
  useEffect(() => {
    const userInfo = async () => {
      try {
        const data = await getRoomByCode(code);
        setAuctionDetails(data);
        setHasError(false);
      }
      catch (error) {
        setAuctionDetails(undefined);
        setHasError(true);
      }
    };
    userInfo();
  }, []);
    return (
    <div className="bauction-white bauction-2 py-4 px-8  rounded-lg bg-white bg-opacity-10 mb-4 mx-[5%]">
        <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2">
                Số điện thoại: {auctionDetails?.phone}
            </p>
            <p className="text-white mb-2">
                Tên nhà mạng:
            </p>
        </div>

        <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2">
                Thời gian đấu giá:
            </p>
            <p className="text-white mb-2">
                Số người tham gia:
            </p>
        </div>
        
        

        <div className="bauction-2 bauction-white mb-2"></div>

        <div className="grid lg:grid-cols-2">
        <p className="text-white my-2 lg:my-0">
            Người đấu giá thành công: 
        </p>
        <p className="text-white">
            Giá cao nhất:
        </p>
            

        </div>
      </div>
  );
}

export default CompletedAuction;