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
import {
  getAllSims,
  getSimByProvider,
} from "../../features/axios/api/sim/SimDetails";
import { filter, set } from "lodash";
import { all } from "axios";
import { getAccountsByRole } from "../../features/axios/api/account/AccountsDetail";
import { userInterface } from "../../types/UserInterface";
import ConfirmUserWindow from "./ConfirmUserWindow";
import DeleteConfirm from "./DeleteConfim";
import CreateUserWindow from "./CreateUserWindow";
import { RoomInterface } from "../../types/RoomInterface";
import { getAllHistories } from "../../features/axios/api/room/RoomDetails";
import ConfirmRoomWindow from "./ConfirmRoomWindow";
import DeleteRoomConfirm from "./DeleteRoomConfirm";

type FilterParams = {
  provider: string | null;
  state: string | null;
  query: string | null;
};

export default function AuctionList() {
  const [allProviders, setAllProviders] = useState<userInterface[]>([]); // variables for search searching
  const [createWindow, setCreateWindow] = useState<React.ReactNode>();
  const [allRooms, setAllRooms] = useState<RoomInterface[]>([]); // variables for search searching
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filterParams, setFilterParams] = useState<FilterParams>({
    provider: "",

    state: "",
    query: "",
  });
  // variables for filtering
  const [selectedProvider, setSelectedProvider] = useState("");

  const [selectedType, setSelectedType] = useState("");
  const handleFilter = (provider: string, state: string, query: string) => {
    setFilterParams({
      ...filterParams,
      provider: provider,
      state: state,
      query: query,
    });
  };

  const getAllRoomsList = async () => {
    try {
      return await getAllHistories();
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuery = async () => {
    let allRoomList: RoomInterface[] = [];
    if (selectedProvider === "" && searchQuery === "" && selectedType === "") {
      allRoomList = await getAllRoomsList();
      setAllRooms(allRoomList);
    }

    if (selectedProvider !== "" || selectedType !== "" || searchQuery !== "") {
      handleFilter(selectedProvider, selectedType, searchQuery);
    }
  };

  const handleSearch = async () => {
    let allRoomsList: RoomInterface[] = await getAllRoomsList();
    if (filterParams.provider) {
      allRoomsList = allRoomsList.filter((room) => {
        return (
          room.provider?.toLowerCase() === filterParams.provider?.toLowerCase()
        );
      });
    }
    if (filterParams.state) {
      allRoomsList = allRoomsList.filter((room) => {
        return room.state === filterParams.state;
      });
    }
    if (filterParams.query) {
      allRoomsList = allRoomsList.filter((room) => {
        return room
          .code!.toLowerCase()
          .includes(filterParams.query!.toLowerCase());
      });
    }

    setAllRooms(allRoomsList);
    console.log("searching");
  };

  useEffect(() => {
    console.log(filterParams);
    handleSearch();
  }, [filterParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRoomsList = await getAllRoomsList();
        setAllRooms(allRoomsList);
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);

  const [confirmWindow, setConfirmWindow] = useState<React.ReactNode>();
  const [cf_index, setIndex] = useState<number>();
  const handleButtonClick = (room: RoomInterface, index: number) => {
    const onClose = () => {
      setConfirmWindow(undefined);
      window.location.reload();
    };
    const onCloseButt = () => {
      setConfirmWindow(undefined);
    };
    if (room.state == "Chờ duyệt") {
      console.log("duyet");
      setIndex(index);
      setConfirmWindow(
        <ConfirmRoomWindow
          room={room}
          onClose={onClose}
          onCloseButt={onCloseButt}
        />
      );
    } else if (room.state == "Chờ xóa") {
      setIndex(index);
      console.log("xoa");

      setConfirmWindow(
        <DeleteRoomConfirm
          room={room}
          onClose={onClose}
          onCloseButt={onCloseButt}
        />
      );
    }
  };
  const handleCreate = () => {
    const onClose = () => {
      setCreateWindow(undefined);
      window.location.reload();
    };
    const onCloseButt = () => {
      setCreateWindow(undefined);
    };
    setCreateWindow(
      <CreateUserWindow
        role="provider"
        onClose={onClose}
        onCloseButt={onCloseButt}
      />
    );
  };
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
            className=" bg-transparent border-border border w-48 rounded-lg py-2 px-4 font-base text-gray-500"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">Chọn nhà mạng</option>

            <option value="Viettel">Viettel</option>
            <option value="Vinaphone">Vinaphone</option>
            <option value="Mobifone">Mobifone</option>
            <option value="Vietnamobile">Vietnamobile</option>
            <option value="Gmobile">Gmobile</option>
          </select>
        </div>

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
                  Lựa chọn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#162233" }}>
              {allRooms.map((room, index) => (
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
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {room.state == "Chờ duyệt" && (
                      <div>
                        <Button
                          style={{
                            border: "1px",
                            borderRadius: "16px",
                            padding: "8px",
                            color: "white",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                          onClick={() => handleButtonClick(room, index)}
                        >
                          Duyệt
                        </Button>
                      </div>
                    )}
                    {room.state != "Chờ duyệt" && (
                      <div>
                        <Button
                          style={{
                            background: "red",
                            border: "1px",
                            borderRadius: "16px",
                            padding: "8px",
                            color: "white",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                          disabled={room.state == "Chờ xóa" ? false : true}
                          onClick={() => handleButtonClick(room, index)}
                        >
                          Xóa
                        </Button>
                      </div>
                    )}

                    {index === cf_index && <div>{confirmWindow}</div>}
                    <div>{createWindow}</div>
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
