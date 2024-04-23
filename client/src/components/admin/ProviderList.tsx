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
  provider: string | null;
  type: string | null;
  query: string | null;
};

export default function ProviderList() {
  const [allProviders, setAllProviders] = useState<userInterface[]>([]); // variables for search searching
  const [createWindow, setCreateWindow] = useState<React.ReactNode>();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filterParams, setFilterParams] = useState<FilterParams>({
    provider: "",
    type: "",
    query: "",
  });
  // variables for filtering
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [role, setRole] = useState("provider");
  const handleFilter = (provider: string, type: string, query: string) => {
    setFilterParams({
      ...filterParams,
      provider: provider,
      type: type,
      query: query,
    });
  };
  const getAllProvidersList = async (role: string) => {
    try {
      return await getAccountsByRole(role);
    } catch (error) {
      console.log(error);
    }
    console.log("fetching data 1");
  };

  const handleQuery = async (role: string) => {
    let allProviderList: userInterface[] = [];
    if (selectedProvider === "" && searchQuery === "" && selectedType === "") {
      allProviderList = await getAllProvidersList(role);
      setAllProviders(allProviderList);
    }

    if (selectedProvider !== "" || selectedType !== "" || searchQuery !== "") {
      handleFilter(selectedProvider, selectedType, searchQuery);
    }
  };

  const handleSearch = async (role: string) => {
    let allProvidersList: userInterface[] = await getAllProvidersList(role);

    if (filterParams.provider) {
      allProvidersList = allProvidersList.filter((provider) => {
        return (
          provider.name?.toLowerCase() === filterParams.provider?.toLowerCase()
        );
      });
    }
    if (filterParams.type) {
      allProvidersList = allProvidersList.filter((provider) => {
        let filterType = provider.state === true ? "Đã duyệt" : "Chờ duyệt";
        console.log(provider.state);
        return filterType === filterParams.type;
      });
    }
    if (filterParams.query) {
      allProvidersList = allProvidersList.filter((provider) => {
        return provider
          .name!.toLowerCase()
          .includes(filterParams.query!.toLowerCase());
      });
    }
    setAllProviders(allProvidersList);
    console.log("searching");
  };

  useEffect(() => {
    console.log(filterParams);
    handleSearch(role);
  }, [filterParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProvidersList = await getAccountsByRole(role);
        setAllProviders(allProvidersList);
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);

  const [confirmWindow, setConfirmWindow] = useState<React.ReactNode>();
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
          Danh sách nhà cung cấp trên hệ thống
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
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Đã duyệt">Đã duyệt</option>
          </select>
        </div>
        <div className="relative border-border flex w-full gap-2 mx-4 md:w-max">
          <Input
            type="search"
            label="Nhập nhà cung cấp cần tìm..."
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
            onClick={() => handleQuery(role)}
          >
            Tìm kiếm
          </Button>
        </div>
        <div>
          <Button
            size="md"
            className=" rounded-xl font-medium text-sm ml-8"
            color="green"
            onClick={() => handleCreate()}
          >
            Tạo tài khoản
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
              {allProviders.map((provider, index) => (
                <TableRow
                  key={provider._id}
                  style={{ borderRadius: "4px", marginBottom: "4px" }}
                >
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {provider.name}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {provider.email}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {provider.phone}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {provider.state ? "Đã duyệt" : "Chờ duyệt"}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {!provider.state && (
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
                          onClick={() => handleButtonClick(provider, index)}
                        >
                          Duyệt
                        </Button>
                      </div>
                    )}
                    {provider.state && (
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
                          onClick={() => handleButtonClick(provider, index)}
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
