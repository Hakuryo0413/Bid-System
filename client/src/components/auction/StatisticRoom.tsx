import { MouseEventHandler, useEffect, useState } from "react";

import { Navbar, Button, Input } from "@material-tailwind/react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getAccountsByEmail } from "../../features/axios/api/account/AccountsDetail";
import { userInterface } from "../../types/UserInterface";
import { Link } from "react-router-dom";

import { RoomInterface } from "../../types/RoomInterface";
import {
  getAllHistories,
  getRoomByProvider,
} from "../../features/axios/api/room/RoomDetails";

type FilterParams = {
  state: string | null;
  query: string | null;
};

export default function StatisticRoom() {
  const [allProviders, setAllProviders] = useState<userInterface[]>([]); // variables for search searching
  const [createWindow, setCreateWindow] = useState<React.ReactNode>();
  const [allRooms, setAllRooms] = useState<RoomInterface[]>([]); // variables for search searching
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterParams, setFilterParams] = useState<FilterParams>({
    state: "",
    query: "",
  });
  // variables for filtering
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedType, setSelectedType] = useState("");

  let email = localStorage.getItem("username") || "";
  let providerName = "";
  const handleFilter = (state: string, query: string) => {
    setFilterParams({
      ...filterParams,

      state: state,
      query: query,
    });
  };
  const providerInfo = async (email: string) => {
    try {
      const res = await getAccountsByEmail(email);
      console.log(res);
      providerName = res.name;
      console.log(providerName);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllRoomsList = async (provider: string) => {
    try {
      console.log(providerName);
      return await getRoomByProvider(provider);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleQuery = async () => {
    let allRoomList: RoomInterface[] = [];
    if (searchQuery === "" && selectedType === "") {
      console.log("jhih");
      await providerInfo(email);
      allRoomList = await getAllRoomsList(providerName);

      setAllRooms(allRoomList);
    }

    if (selectedType !== "" || searchQuery !== "") {
      handleFilter(selectedType, searchQuery);
    }
  };
  const handleSearch = async () => {
    let allRoomsList: RoomInterface[] = await getAllRoomsList(providerName);

    if (filterParams.state) {
      allRoomsList = allRoomsList?.filter((room) => {
        return room.state === filterParams.state;
      });
    }
    if (filterParams.query) {
      allRoomsList = allRoomsList?.filter((room) => {
        return room
          .code!.toLowerCase()
          .includes(filterParams.query!.toLowerCase());
      });
    }

    setAllRooms(allRoomsList);
    console.log("searching");
  };

  useEffect(() => {
    const filterData = async () => {
      try {
        await providerInfo(email);
        handleSearch();
      } catch (error) {
        console.log(error);
      }
    };
    filterData();
  }, [filterParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await providerInfo(email); // Chờ providerInfo hoàn thành trước khi tiếp tục
        console.log(providerName); // Đảm bảo providerName đã được cập nhật
        const allRoomsList = await getAllRoomsList(providerName);
        setAllRooms(allRoomsList);
        console.log(allRoomsList);
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };

    fetchData(); // Gọi fetchData từ useEffect
  }, [email]); // Sử dụng email là dependency thay vì providerName

  return (
    <>
      <div className="px-8  ">
        <p className="flex py-8 mx-[2.5%] text-white text-2xl justify-center font-bold">
          Danh sách phòng đấu giá
        </p>
      </div>
      <div className="flex flex-wrap  items-center justify-center gap-y-4  text-blue-gray-900">
        <div className="mx-4">
          <select
            className="bg-transparent border-border border w-48 rounded-lg py-2 px-4 text-md font-base text-gray-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Chọn trạng thái</option>
            <option value="Chờ xóa">Chờ xóa</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Chờ đấu giá">Chờ đấu giá</option>
            <option value="Đang đấu giá">Đang đấu giá</option>
            <option value="Chờ thanh toán">Chờ thanh toán</option>
            <option value="Đấu giá thất bại">Đấu giá thất bại</option>
            <option value="Đấu giá thành công">Đấu giá thành công</option>
            <option value="Đã xóa">Đã xóa</option>
          </select>
        </div>
        <div className="relative border-border flex w-full gap-2 mx-4 md:w-max">
          <Input
            type="search"
            label="Nhập phòng đấu giá cần tìm..."
            value={searchQuery}
            color="green"
            className="text-white"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <Button
            size="md"
            className=" rounded-xl font-medium text-sm"
            color="green"
            onClick={() => handleQuery()}
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
                  Số lượt tham gia
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#162233" }}>
              {allRooms?.map((room, index) => (
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
                    {room.state}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      textAlign: "center",
                      textDecoration: "underline",
                    }}
                  >
                    <Link to={`/provider/auction/${room.code}`}>
                      {room.participants?.length}
                    </Link>
                    {/*  <a href={`/provider/auction/${room.code}`}>
                      {room.participants?.length}
                    </a> */}
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
