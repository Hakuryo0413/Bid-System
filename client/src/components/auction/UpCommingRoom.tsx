import { MouseEventHandler, useEffect, useState } from "react";

import { Button, Input } from "@material-tailwind/react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { RoomInterface } from "../../types/RoomInterface";
import { getAllHistories } from "../../features/axios/api/room/RoomDetails";

import ConfirmJoinRoomWindow from "../admin/ConfirmJoinRoomWindow";
import DeleteJoinRoomConfirm from "../admin/DeleteJoinRoomConfirm";
import { getAccountsByEmail } from "../../features/axios/api/account/AccountsDetail";
import { ToastContainer, toast } from "react-toastify";

type FilterParams = {
  provider: string | null;
  state: string | null;
  query: string | null;
};
const isUserParticipant = (room: RoomInterface, email: string) => {
  return room.participants?.some((participant) => participant.email === email);
};
const hasBankAccount = (userBankAccount: string) => {
  if (userBankAccount === "" || userBankAccount === "undefined") return false;
  return true; // Chuyển đổi giá trị sang boolean và trả về
};
export default function UpCommingRoom() {
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
  let email = localStorage.getItem("username") || "";
  let bankAccount = "";
  const userInfo = async (email: string) => {
    try {
      const res = await getAccountsByEmail(email);
      console.log(res);
      bankAccount = res.bankAccount;
      localStorage.setItem("bankAccount", bankAccount);
      console.log(bankAccount);
    } catch (error) {
      console.log(error);
    }
  };
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
  const fetchData = async () => {
    try {
      await userInfo(email);
      let allRoomsList: RoomInterface[] = await getAllRoomsList();
      allRoomsList = allRoomsList.filter((room) => {
        return room.state == "Chờ đấu giá" || room.state == "Đang đấu giá";
      });
      setAllRooms(allRoomsList);
    } catch (error) {
      // Xử lý lỗi nếu có
    }
  };
  const handleQuery = async () => {
    if (selectedProvider === "" && searchQuery === "" && selectedType === "") {
      fetchData();
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
    console.log("fetching data");
    console.log(bankAccount);
    fetchData();
  }, []);
  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const [confirmWindow, setConfirmWindow] = useState<React.ReactNode>();
  const [cf_index, setIndex] = useState<number>();
  let check = localStorage.getItem("bankAccount") || "";
  const handleButtonClick = (room: RoomInterface, index: number) => {
    const onClose = () => {
      setConfirmWindow(undefined);
      window.location.reload();
    };
    const onCloseButt = () => {
      setConfirmWindow(undefined);
    };
    if (!hasBankAccount(check)) {
      console.log(hasBankAccount(check));
      notify("Hãy hoàn hiện hồ sơ", "error");
    } else if (
      room.state == "Chờ đấu giá" &&
      !isUserParticipant(room, email) &&
      hasBankAccount(check)
    ) {
      console.log(hasBankAccount(check));
      setIndex(index);
      setConfirmWindow(
        <ConfirmJoinRoomWindow
          room={room}
          onClose={onClose}
          onCloseButt={onCloseButt}
        />
      );
    } else if (room.state == "Chờ đấu giá" && isUserParticipant(room, email)) {
      setIndex(index);
      console.log("xoa");
      setConfirmWindow(
        <DeleteJoinRoomConfirm
          room={room}
          onClose={onClose}
          onCloseButt={onCloseButt}
        />
      );
    }
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
          </select>
        </div>

        <div className="mx-4">
          <select
            className="bg-transparent border-border border w-48 rounded-lg py-2 px-4 text-md font-base text-gray-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Chọn trạng thái</option>

            <option value="Chờ đấu giá">Chờ đấu giá</option>
            <option value="Đang đấu giá">Đang đấu giá</option>
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
                    {room.start_at
                      ? new Date(room.start_at).toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {room.state}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {isUserParticipant(room, email) ? (
                      <div>
                        <Button
                          style={{
                            border: "1px",
                            backgroundColor: "red",
                            borderRadius: "16px",
                            padding: "8px",
                            color: "white",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                          onClick={() => handleButtonClick(room, index)}
                        >
                          Huỷ đấu giá
                        </Button>
                      </div>
                    ) : (
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
                          disabled={room.state == "Chờ đấu giá" ? false : true}
                          onClick={() => handleButtonClick(room, index)}
                        >
                          Đăng ký đấu giá
                        </Button>
                      </div>
                    )}

                    {index === cf_index && <div>{confirmWindow}</div>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </div>
    </>
  );
}
