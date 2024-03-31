import React, { useEffect, useState } from "react";
import { RoomInterface } from "../../types/RoomInterface";
import ParticipantsList from "./ParticipantsList";
import HappeningAuction from "./HappeningAuction";
import CompletedAuction from "./CompletedAuction";

interface AuctionInforProps {
    code: string;
}
  
const AuctionInfor: React.FC<AuctionInforProps> = ({ code }) => {

  const [AuctionInfor, setAuctionInfor] = useState<RoomInterface>(); // State để lưu trữ mã vận đơn
  const [hasError, setHasError] = useState(false); // State để kiểm tra lỗi
  // const [filter, setFilter] = useState<string>('');
  // const [filteredAuction, setFilteredOrders] = useState([...]);
  // const handleFilter = (filter: string) => {
  //   onFilter(filter);
  // };

  // const onFilter = (filter: string) => {
  //   if(filter === '') {
  //     setFilteredOrders(allOrders);
  //     return;
  //   }
  //   console.log(filter)
  //   const filtered = allOrders.filter(
  //     (order) =>
  //       order.status?.[order.status.length - 1]?.action?.toLowerCase() === filter.toLowerCase()
  //   );
  //   setFilteredOrders(filtered);
  // };

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
    <div className="bg-background px-[5%] pb-8 flex-grow">
        <div>
            <p className="flex lg:py-4 py-4 text-white text-[20px] font-bold">
                Thông tin đấu giá
            </p>

            {AuctionInfor?.time_limit ?? 0 > 0 ? (
                <HappeningAuction />     
            ) : (
                <CompletedAuction code={"00000000"}/>
            )}
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
                className="text-white w-[100px] items-center bg-activeButton rounded-lg ml-2 hover:bg-green-900 hidden lg:block"
                >
                Tìm kiếm
                </button>
            </div>

            <div className="border-white border-2 py-4 px-4 pb-10 rounded-lg bg-white">
              <div className="flex justify-end pb-4">
                <select
                  // value={filter}
                  // onChange={(e) => {
                  //   setFilter(e.target.value);
                  //   handleFilter(e.target.value);
                  // }}
                  className="p-2 border border-gray-300 border-4 rounded focus:outline-none focus:ring focus:border-green-500"
                >
                  <option value="" hidden>Trạng thái sàn đấu giá</option>
                  <option value="Đang chờ duyệt">Đang chờ duyệt</option>
                  <option value="Đang diễn ra">Đang diễn ra</option>
                  
                </select>
              </div>
                {/* <ParticipantsList participants={AuctionInfor?.participants ?? []}/> */}
            </div>

        </div>

    </div>
  );
};

export default AuctionInfor