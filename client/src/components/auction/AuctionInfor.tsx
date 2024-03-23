import React, { useEffect, useState } from "react";
import { RoomInterface } from "../../types/RoomInterface";
import ParticipantsList from "./ParticipantsList";

interface AuctionInforProps {
    code: string;
}
  
const AuctionInfor: React.FC<AuctionInforProps> = ({ code }) => {

  const [AuctionInfor, setAuctionInfor] = useState<RoomInterface>(); // State để lưu trữ mã vận đơn
  const [hasError, setHasError] = useState(false); // State để kiểm tra lỗi

//   useEffect(() => {
//     const userInfo = async () => {
//       try {
//         const data = await auctionData(id);
//         setAuctionInfor(data);
//         setHasError(false);
//       }
//       catch (error) {
//         setAuctionInfor(undefined);
//         setHasError(true);
//       }
//     };
//     userInfo();
//   }, []);

  useEffect(() => {
    function setPadding(){
      let header: HTMLElement | null  = document.getElementById('fixed-header');
      let container: HTMLElement | null  = document.getElementById('container');

      if(container) {
        container.style.marginTop = header?.offsetHeight  + "px";
      }
    }
    setPadding();
    window.addEventListener('resize', setPadding);
  });

  return (
    <div className="bg-background px-8 lg:px-64 pb-8 flex-grow">
        <div>
            <p className="flex lg:py-4 py-4 text-white text-[20px] font-bold">
                Thông tin đấu giá
            </p>

            <div className="border-white border-2 py-4 px-8  rounded-lg bg-bgBlue">
                <div className="grid lg:grid-cols-2">
                    <p className="text-white mb-2">
                        Số điện thoại:
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
                
                

                <div className="border-2 border-white mb-2"></div>

                <div className="grid lg:grid-cols-2">
                    <p className="text-white my-2 lg:my-0">
                        Người đấu giá thành công: 
                    </p>
                    <p className="text-white">
                        Giá cao nhất:
                    </p>
                </div>

            </div>
        </div>

        <div className="pt-4">
            <p className="flex py-4  text-white text-[20px] font-bold">
                Danh sách người tham gia
            </p>

            <div className="flex justify-end pb-4">
                <input type="text" className="bg-background lg:w-[40%] w-full rounded-lg px-4 py-2 border-2 border-white placeholder-gray-600 text-white"
                        placeholder="Nhập thông tin cần tìm"/>
                <button
                type="submit"
                className="text-white w-[100px] items-center bg-activeButton rounded-lg ml-2 hover:bg-green-900"
                >
                Tìm kiếm
                </button>
            </div>

            <div className="border-white border-2 py-4 px-4 pb-10 rounded-lg bg-bgBlue">
                <ParticipantsList participants={AuctionInfor?.participants ?? []}/>
            </div>

        </div>

    </div>
  );
};

export default AuctionInfor