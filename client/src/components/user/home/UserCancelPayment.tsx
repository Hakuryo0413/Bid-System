import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountsByEmail } from "../../../features/axios/api/account/AccountsDetail";
import { getSimByNumber } from "../../../features/axios/api/sim/SimDetails";
import { useParams } from "react-router-dom";
import { getRoomByCode } from "../../../features/axios/api/room/RoomDetails";
import { HistoryInterface } from "../../../types/HistoryInterface";
import { getHistoryById } from "../../../features/axios/api/history/HistoryDetails";
import { updateHistory } from "../../../features/axios/api/history/UpdateHistory";
import {
  ParticipantInterface,
  RoomInterface,
} from "../../../types/RoomInterface";
import { updateRoom } from "../../../features/axios/api/room/UpdateRoom";
import createNewNotification from "../../../features/axios/api/notification/CreateNotification";
import { NotificationInterface } from "../../../types/NotificationInterface";

function UserCancelPayment() {
  const { number, code, historyId } = useParams();
  const navigate = useNavigate();
  console.log(number);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("username") || "");
  const [provider, setProvider] = useState("");
  const [sim, setSim] = useState("");
  const [room, setRoom] = useState<RoomInterface>();
  const [lastPrice, setLastPrice] = useState(0);
  const [historyInfo, setHistoryInfo] = useState<HistoryInterface>();
  const [noti, setNoti] = useState<NotificationInterface>();
  const [particinpants, setParticipants] = useState<ParticipantInterface[]>();
  const getData = async (email: string) => {
    const data = await getAccountsByEmail(email);
    setName(data.name);
  };
  const handleClick = () => {
    navigate("/auction/history");
  };
  useEffect(() => {
    const getDataSim = async (number: string) => {
      try {
        const data = await getSimByNumber(number);
        console.log(data);
        setSim(data.number);
        setProvider(data.provider);
        setLastPrice(data.last_price);
      } catch (error) {
        console.error("Error fetching SIM data:", error);
        // Xử lý lỗi tại đây nếu cần
      }
    };

    if (number) {
      getDataSim(number);
    }
  }, [number]);
  useEffect(() => {
    const getHistory = async (id: string) => {
      try {
        const data = await getHistoryById(id);
        console.log(data);
        setHistoryInfo(data);
      } catch (error) {
        console.error("Error fetching SIM data:", error);
        // Xử lý lỗi tại đây nếu cần
      }
    };
    if (historyId) {
      getHistory(historyId);
    }
  }, [historyId]);

  // const createNoti = async (email: string) => {
  //   const data: NotificationInterface = {};
  //   data.account = particinpants?.[2].email;
  //   data.type = "traTien";
  //   data.content = "Chúc mừng bạn đã đấu giá thành công";
  //   data.from = email;
  //   data.state = false;
  //   const res = await createNewNotification(data);
  //   console.log(res);
  //   /* setNoti(res); */
  // }

  const updateHis = async () => {
    if (historyInfo) {
      console.log(historyInfo);
      historyInfo.state = "Đã hủy";
      await updateHistory(historyInfo);
    }
  };
  const updateRoomParticipant = async () => {
    if (room) {
      room.state = "Chưa gửi thông báo";
      room.participants = room.participants?.filter((p) => p.email !== email);
      await updateRoom(room);
    }
  };

  useEffect(() => {
    updateRoomParticipant();
  }, [updateHis]);

  const paymentCancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
    updateHis();
    // createNoti(email);

    navigate("/auction/history");
  };

  useEffect(() => {
    const getRoom = async (code: string) => {
      try {
        const data = await getRoomByCode(code);
        /*         setParticipants(data.participants);
         */ console.log(data);
        console.log(data.participants);
        setRoom(data);
      } catch (error) {
        console.error("Error fetching SIM data:", error);
        // Xử lý lỗi tại đây nếu cần
      }
    };
    if (code) {
      getRoom(code);
    }
  }, [code]);

  useEffect(() => {
    console.log(email);
    getData(email);
  }, []);

  return (
    <div className="border border-border rounded-2xl text-white  ">
      <form>
        <h2 className="text-4xl py-8 text-center"> Huỷ thanh toán </h2>
        <div className="px-8 text-base ">
          <p>1. Thông tin sim:</p>
          <div className="mt-4 grid  grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block  font-medium leading-6 text-white">
                Số điện thoại:
                <span className="ml-2">{sim}</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block  font-medium leading-6 text-white">
                Nhà phân phối:
                <span className="ml-2">{provider}</span>
              </label>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block  font-medium leading-6 text-white">
                Phiên đấu giá:
                <span className="ml-2">{room?.code}</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block  font-medium leading-6 text-white">
                Giá tiền:
                <span className="ml-2">{lastPrice}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 mx-8"></div>
        <div className="px-8 py-8 text-base">
          <p>2. Huỷ thanh toán:</p>
          <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block  font-medium leading-6 text-white ">
                Người mua:
                <span className="ml-2">{name}</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block  font-medium leading-6 text-white">
                Số CCCD:
                <span className="ml-2"></span>
              </label>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 justify-center  gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <label className="block text-base mb-2  font-medium  leading-6 text-white">
                Lý do huỷ thanh toán:
              </label>
              <select
                id="reason"
                className="w-full px-2 py-2 my-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-inset"
                required
                placeholder="Lý do"
              >
                <option value="Chọn lý do">Chọn lý do</option>

                <option value="Thủ tục thanh toán rắc rối">
                  Thủ tục thanh toán rắc rối
                </option>
                <option value="Tôi tìm thấy chỗ mua khác tốt hơn (Rẻ hơn, uy tín hơn...)">
                  Tôi tìm thấy chỗ mua khác tốt hơn (Rẻ hơn, uy tín hơn...)
                </option>

                <option value="Tôi tìm thấy sản phẩm khác phù hợp hơn ">
                  Tôi tìm thấy sản phẩm khác phù hợp hơn
                </option>

                <option value="Lý do cá nhân">Lý do cá nhân</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-20 pb-12">
          <button
            className=" border-border w-32 border-2  text-white hover:bg-green-500  mx-4 px-4 py-2 rounded-lg"
            onClick={handleClick}
          >
            Huỷ
          </button>
          <button
            onClick={paymentCancel}
            className="hover:bg-green-500 border-2 border-border text-white px-4 w-32 py-2 mx-4 rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserCancelPayment;
