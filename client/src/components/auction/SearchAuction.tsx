import { useState } from "react";
import CompletedAuction from "./CompletedAuction";
import HappeningAuction from "./HappeningAuction";
import { Navbar, Button, Input } from "@material-tailwind/react";
import ParticipantsList from "./ParticipantsList";
import AuctionInfor from "./AuctionInfor";
import { RoomInterface } from "../../types/RoomInterface";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function SearchAuction() {
  const auctionData = [
    {
      id: 1,
      price: 2000000,
      provider: "Viettel",
      phoneNumber: "0987654321",
      time: "2021-10-10",
    },
    {
      id: 1,
      price: 2000000,
      provider: "Viettel",
      phoneNumber: "0987654321",
      time: "2021-10-10",
    },
    // ... thêm các đối tượng đấu giá khác
  ];

  const [AuctionInfor, setAuctionInfor] = useState<RoomInterface>(); // State để lưu trữ mã vận đơn

  // variables for search searching
  const [searchQuery, setSearchQuery] = useState("");
  const [prices, setPrices] = useState([]);
  const [providers, setProviders] = useState([]);

  // variables for filtering
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  // variables for filtering

  return (
    <>
      <div className="px-8  ">
        <p className="flex py-8 mx-[2.5%] text-white text-2xl justify-center font-bold">
          Tìm kiếm sim số đẹp
        </p>
      </div>
      <div className="flex flex-wrap  items-center justify-center gap-y-4  text-blue-gray-900">
        <div className="mx-4">
          <select
            className=" bg-transparent border-border border w-48 rounded-lg py-2 px-4 font-base text-gray-500"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">Chọn nhà mạng</option>
            {providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>
        <div className="mx-4">
          <select
            className=" bg-transparent border border-border w-48 rounded-lg py-2 px-4 font-base text-gray-500"
            // value={selectedRole}
            // onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Chọn loại số</option>
            {/* {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))} */}
          </select>
        </div>
        <div className="mx-4">
          <select
            className=" bg-transparent border-border border w-48 rounded-lg py-2 px-4 text-md font-base text-gray-500"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Chọn giá sàn</option>
            {/* {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))} */}
          </select>
        </div>

        <div className="relative border-border flex w-full gap-2 mx-4 md:w-max">
          <Input
            type="search"
            label="Nhập số điện thoại cần tìm..."
            color="green"
            className="pr-20"
            // containerProps={{
            //   className: "min-w-[288px]",
            // }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <Button
            size="md"
            className=" rounded-xl font-medium text-sm"
            color="green"
            //   onClick={() => handleFilter()}
          >
            Tìm kiếm
          </Button>
        </div>
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
                  Số điện thoại
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Nhà Mạng
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Thời gian đấu giá
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Giá sàn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#162233" }}>
              {auctionData.map((auction) => (
                <TableRow
                  key={auction.id}
                  style={{ borderRadius: "4px", marginBottom: "4px" }}
                >
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {auction.id}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {auction.phoneNumber}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {auction.provider}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {auction.time}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {auction.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
