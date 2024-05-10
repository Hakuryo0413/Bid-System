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

type FilterParams = {
  type: string | null;
  query: string | null;
};

export default function UserList() {
  const [allUsers, setAllUsers] = useState<userInterface[]>([]); // variables for search searching

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filterParams, setFilterParams] = useState<FilterParams>({
    type: "",
    query: "",
  });
  // variables for filtering
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [role, setRole] = useState("user");
  const handleFilter = (type: string, query: string) => {
    setFilterParams({
      ...filterParams,
      type: type,
      query: query,
    });
  };
  const getAllUsersList = async (role: string) => {
    try {
      return await getAccountsByRole(role);
    } catch (error) {
      console.log(error);
    }
    console.log("fetching data 1");
  };

  const handleQuery = async (role: string) => {
    let allUserList: userInterface[] = [];
    if (searchQuery === "" && selectedType === "") {
      allUserList = await getAllUsersList(role);
      setAllUsers(allUserList);
    }

    if (selectedType !== "" || searchQuery !== "") {
      handleFilter(selectedType, searchQuery);
    }
  };

  const handleSearch = async (role: string) => {
    let allUsersList: userInterface[] = await getAllUsersList(role);

    if (filterParams.type) {
      allUsersList = allUsersList.filter((user) => {
        let filterType = user.state === true ? "true" : "false";
        return filterType === filterParams.type;
      });
    }
    if (filterParams.query) {
      allUsersList = allUsersList.filter((user) => {
        return (
          user
            .name!.toLowerCase()
            .includes(filterParams.query!.toLowerCase()) ||
          user
            .email!.toLowerCase()
            .includes(filterParams.query!.toLowerCase()) ||
          user.phone!.toLowerCase().includes(filterParams.query!.toLowerCase())
        );
      });
    }
    setAllUsers(allUsersList);
    console.log("searching");
  };

  useEffect(() => {
    console.log(filterParams);
    handleSearch(role);
  }, [filterParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersList = await getAccountsByRole(role);
        setAllUsers(allUsersList);
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);

  const [confirmWindow, setConfirmWindow] = useState<React.ReactNode>();
  const [createWindow, setCreateWindow] = useState<React.ReactNode>();
  const [cf_index, setIndex] = useState<number>();
  const handleButtonClick = (user: userInterface, index: number) => {
    const onClose = () => {
      setConfirmWindow(undefined);
      window.location.reload();
    };
    const onCloseButt = () => {
      setConfirmWindow(undefined);
    };
    if (!user.state) {
      setIndex(index);
      setConfirmWindow(
        <ConfirmUserWindow
          user={user}
          onClose={onClose}
          onCloseButt={onCloseButt}
        />
      );
    } else {
      setIndex(index);
      setConfirmWindow(
        <DeleteConfirm
          user={user}
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
        role="user"
        onClose={onClose}
        onCloseButt={onCloseButt}
      />
    );
  };
  return (
    <>
      <div className="px-8  ">
        <p className="flex py-8 mx-[2.5%] text-white text-2xl justify-center font-bold">
          Danh sách người dùng trên hệ thống
        </p>
      </div>
      <div className="flex flex-wrap  items-center justify-center gap-y-4  text-blue-gray-900">
        <div className="mx-4">
          <select
            className=" bg-transparent border-border border w-48 rounded-lg py-2 px-4 font-base text-gray-500"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">Chọn tình trạng hồ sơ</option>

            <option value="true">Hồ sơ đầy đủ</option>
            <option value="false">Chưa hoàn thiện</option>
          </select>
        </div>

        <div className="relative border-border flex w-96 gap-2 mx-4 ">
          <Input
            type="search"
            label="Nhập tên người dùng, email, số điện thoại cần tìm..."
            value={searchQuery}
            color="green"
            className="text-white w-96"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <Button
            size="md"
            className=" rounded-xl font-medium text-sm"
            color="green"
            onClick={() => handleQuery(role)}
          >
            Tìm kiếm
          </Button>
        </div>
        {/* <div>
          <Button
            size="md"
            className=" rounded-xl font-medium text-sm ml-8"
            color="green"
            onClick={() => handleCreate()}
          >
            Tạo tài khoản
          </Button>
        </div> */}
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
                  Tên người dùng
                </TableCell>

                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    fontSize: 15,
                    textAlign: "center",
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
                  Tình trạng
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
              {allUsers.map((user, index) => (
                <TableRow
                  key={user._id}
                  style={{ borderRadius: "4px", marginBottom: "4px" }}
                >
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {user.name}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {user.email}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {user.phone}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {user.state === true ? "Đã duyệt" : "Chưa duyệt"}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {!user.state && (
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
                          onClick={() => handleButtonClick(user, index)}
                        >
                          Duyệt
                        </Button>
                      </div>
                    )}
                    {user.state && (
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
                          onClick={() => handleButtonClick(user, index)}
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
