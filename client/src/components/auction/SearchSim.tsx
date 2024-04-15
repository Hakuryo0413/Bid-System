import { MouseEventHandler, useEffect, useState } from "react";
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
import { SimInterface } from "../../types/SimInterface";
import {
  getAllSims,
  getSimByProvider,
} from "../../features/axios/api/sim/SimDetails";
import { filter, set } from "lodash";
import { all } from "axios";

type FilterParams = {
  provider: string | null;
  priceMax: number | null;
  priceMin: number | null;
  type: string | null;
  query: string | null;
};

export default function SearchSim() {
  const [allSims, setAllSims] = useState<SimInterface[]>([]); // variables for search searching

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filterParams, setFilterParams] = useState<FilterParams>({
    provider: "",
    priceMax: 0,
    priceMin: 0,
    type: "",
    query: "",
  });
  // variables for filtering
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleFilter = (provider: string, price: string, query: string, type:string) => {
    let minPrice = 0;
    let maxPrice = 100000;
    if (price === "cheap") {
      maxPrice = 50000;
    } else if (price === "expensive") {
      minPrice = 50000;
      maxPrice = 100000;
    }
    setFilterParams({
      ...filterParams,
      provider: provider,
      priceMax: maxPrice,
      priceMin: minPrice,
      type: type,
      query: query,
    });
  };
  const getAllSimsList = async () => {
    try {
      return await getAllSims();
    } catch (error) {
      console.log(error);
    }
    console.log("fetching data 1");
  };

  const handleQuery = async () => {
    let allSimList: SimInterface[] = [];
    if (selectedProvider === "" && selectedPrice === "" && searchQuery === "" && selectedType === "") {
      allSimList = await getAllSimsList();
      setAllSims(allSimList);
    }
    if (selectedProvider !== "" || selectedPrice !== "" || searchQuery !== "" || selectedType !== "") {
      handleFilter(selectedProvider, selectedPrice, searchQuery, selectedType);
    }
    console.log("abc");
  };

  const handleSearch = async () => {
    let allSimList: SimInterface[] = await getAllSimsList();

    if (filterParams.provider) {
      allSimList = allSimList.filter((sim) => {
        return (
          sim.provider?.toLowerCase() === filterParams.provider?.toLowerCase()
        );
      });
    }
    if (filterParams.type) {
      allSimList = allSimList.filter((sim) => {
        return (
          sim.type?.toLowerCase() === filterParams.type?.toLowerCase()
        );
      });
    }
    allSimList = allSimList.filter((sim) => {
      if (sim.starting_price) {
        return (
          sim.starting_price >= (filterParams.priceMin as number) &&
          sim.starting_price <= (filterParams.priceMax as number)
        );
      }
    });

    if (filterParams.query) {
      allSimList = allSimList.filter((sim) => {
        return sim
          .number!.toLowerCase()
          .includes(filterParams.query!.toLowerCase());
      });
    }
    setAllSims(allSimList);
    console.log("searching");
  };

  useEffect(() => {
    console.log(filterParams);
    handleSearch();
  }, [filterParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSimList = await getAllSims();
        setAllSims(allSimList);
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);

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

            <option value="Viettel">Viettel</option>
            <option value="Vinaphone">Vinaphone</option>

            <option value="Mobifone">Mobifone</option>
          </select>
        </div>

        <div className="mx-4">
          <select
            className=" bg-transparent border-border border w-48 rounded-lg py-2 px-4 text-md font-base text-gray-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Chọn tiêu chí</option>
            <option value="Tam hoa">Tam hoa</option>
            <option value="Tứ quý">Tứ quý</option>
          </select>
        </div>
        <div className="mx-4">
          <select
            className=" bg-transparent border-border border w-48 rounded-lg py-2 px-4 text-md font-base text-gray-500"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Chọn giá sàn</option>
            <option value="cheap">từ 0 đến 50000</option>
            <option value="expensive">từ 50000 đến 100000</option>
          </select>
        </div>

        <div className="relative border-border flex w-full gap-2 mx-4 md:w-max">
          <Input
            type="search"
            label="Nhập số điện thoại cần tìm..."
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
            onClick={handleQuery}
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
              {allSims.map((sim, index) => (
                <TableRow
                  key={sim._id}
                  style={{ borderRadius: "4px", marginBottom: "4px" }}
                >
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {sim.number}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {sim.provider}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {sim.start_at
                      ? new Date(sim.start_at).toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    {sim.starting_price}
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
