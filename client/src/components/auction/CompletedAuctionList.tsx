import { useState, useEffect } from "react";
import { getAllHistories } from "../../features/axios/api/room/RoomDetails";
import { RoomInterface } from "../../types/RoomInterface";
import { calcTime, calcTimeInSeconds, formatMoney } from "./utils/format";
import AuctionInfor from "./AuctionInfor";
import CompletedAuction from "./CompletedAuction";
import { Button } from "@material-tailwind/react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function CompletedAuctionList() {
  const [allAuctions, setAllAuctions] = useState<RoomInterface []>();
  const [completedAuctions, setcompletedAuctions] = useState<RoomInterface[]>();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredAuction, setFilteredOrders] = useState([...completedAuctions ?? []]);

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
    const completedAuctionsInfor = async () => {
      if(allAuctions && allAuctions.length > 0) {
        let completedAuction: RoomInterface[] = []
        for (let i = 0; i< allAuctions.length; i++) {
          let time_intervals = calcTime(allAuctions[i].start_at ?? new Date )
          let auctions_time_limit_in_seconds = (allAuctions[i].time_limit ?? 0) * 60;
          let auctions_intervals_in_seconds = calcTimeInSeconds(time_intervals.days, time_intervals.hours, time_intervals.minutes, time_intervals.seconds)
          if (auctions_intervals_in_seconds > 0 && auctions_intervals_in_seconds >= auctions_time_limit_in_seconds && (allAuctions[i].state !== 'Chờ xóa' && allAuctions[i].state !== 'Đã xóa')) {
            completedAuction.push(allAuctions[i])
          }
        }
        console.log(completedAuction)
        setcompletedAuctions(completedAuction)
      }
      else {
        setcompletedAuctions(undefined)
      }
    };
    completedAuctionsInfor();
  }, [allAuctions]);

  
  const handleSearch = (query: string) => {
    if(!completedAuctions || query === '') {
      setFilteredOrders(completedAuctions ?? []);
      return;
    }

    
    const lowercaseQuery = query.toLowerCase();
    // Filter orders based on the search query
    const filtered = completedAuctions.filter(
      (auction) =>
        auction.phone?.toLowerCase().includes(lowercaseQuery) ||
        auction.price?.toString().toLowerCase().includes(lowercaseQuery) ||
        auction.code?.toLowerCase().includes(lowercaseQuery) ||
        auction.provider?.toLowerCase().includes(lowercaseQuery) ||
        auction.state?.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredOrders(filtered);
  };



    return (
    <div className="px-8">
      <p className="flex py-8 ext-white text-[30px] font-bold justify-center">
        Kết quả đấu giá
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
        
      </div>
      <div className=" my-8  m-auto rounded-lg border-2 border-border w-4/5 items-center justify-center">
        <TableContainer>
          <Table sx={{ width: "94%", margin: "0 auto" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  STT
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    textAlign: "center",
                    fontSize: 15,
                  }}
                >
                  Nhà cung cấp
                </TableCell>

                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Mã phòng
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Sim
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Giá cao nhất
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Lựa chọn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#162233" }}>
            {searchQuery === '' ? 
                (
                    completedAuctions?.map((room, index) => (
                        <TableRow
                          key={room._id}
                          style={{ borderRadius: "4px", marginBottom: "4px" }}
                        >
                          <TableCell style={{ color: "white", textAlign: "center" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ color: "white", textAlign: "center" }}>
                            {room.provider}
                          </TableCell>
                          <TableCell style={{ color: "white", textAlign: "center" }}>
                            {room.code}
                          </TableCell>
                          <TableCell style={{ color: "white", textAlign: "center" }}>
                            {room.phone}
                          </TableCell>
                          <TableCell style={{ color: "white", textAlign: "center" }}>
                            {formatMoney(room?.price ?? 0)}
                          </TableCell>
                          <TableCell style={{ color: "white", textAlign: "center" }}>
                            {room.state}
                          </TableCell>
                          <TableCell style={{ color: "white", textAlign: "center" }}>
                            <a href={`/auction/details/${room.code}`} className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 group">
                                <span className="absolute bottom-0 left-0 w-full transition-all duration-150 ease-in-out"></span>
                                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                    <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="relative w-full text-left transition-colors duration-200 ease-in-out">Xem chi tiết</span>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                )
            : (
                filteredAuction?.map((room, index) => (
                    <TableRow
                      key={room._id}
                      style={{ borderRadius: "4px", marginBottom: "4px" }}
                    >
                      <TableCell style={{ color: "white", textAlign: "center" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}>
                        {room.provider}
                      </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}>
                        {room.code}
                      </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}>
                        {room.phone}
                      </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}>
                        {formatMoney(room?.price ?? 0)}
                      </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}>
                        {room.state}
                      </TableCell>
                      <TableCell style={{ color: "white", textAlign: "center" }}>
                        <a href={`/auction/details/${room.code}`} className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 group">
                            <span className="absolute bottom-0 left-0 w-full transition-all duration-150 ease-in-out"></span>
                            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="relative w-full text-left transition-colors duration-200 ease-in-out">Xem chi tiết</span>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
            )}
            </TableBody>
          </Table>
        </TableContainer>
        
      </div>
    </div>
  );
}