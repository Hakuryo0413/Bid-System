import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RoomInterface } from "../../../types/RoomInterface";
import { userInterface } from "../../../types/UserInterface";
import { accountData } from "../../../features/axios/api/account/AccountsDetail";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../features/redux/slices/account/accountLoginAuthSlice";
import {
  getAllHistories,
  getRoomByAccount,
} from "../../../features/axios/api/room/RoomDetails";
import { get } from "lodash";
import { updateRoom } from "../../../features/axios/api/room/UpdateRoom";
import { useForm } from "react-hook-form";
function ConfirmLog({
  setOpen,
  selectedHuy,
  user,
}: {
  setOpen: (value: boolean) => void;
  selectedHuy?: RoomInterface;
  user?: userInterface;
}) {
  const [roomNew, setRoomNew] = useState<RoomInterface>();
  const { register, handleSubmit } = useForm();

  const updateRoomh = async () => {
    console.log("Danh sách người tham gia cũ:", selectedHuy);
    console.log("Người dùng hiện tại:", user);
    try {
      if (selectedHuy) {
        let participants = selectedHuy.participants;
        if (participants && user && user.email) {
          let newParticipants = participants.filter(
            (item) => item.email !== user.email
          );
          selectedHuy.participants = newParticipants;
          setRoomNew(selectedHuy);
          console.log("Người dùng mới", roomNew);
          if (roomNew) {
            updateRoom(roomNew)
              .then((res) => {
                console.log("Cập nhật thành công:", res);
                toast.success("Hủy đăng ký sim thành công");
              })
              .catch((error) => {
                console.error("Lỗi xảy ra khi cập nhật:", error);
                toast.error("Hủy đăng ký sim thất bại");
              });
          }
        }
      }
      setOpen(false);
      // setRoomNew(data);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy danh sách sim:", error);
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-dialog bg-opacity-60">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-background p-4 rounded-lg w-1/2">
          <div className="text-center">
            <h2 className="text-xl font-bold">Xác nhận</h2>
            <p className="text-lg">
              Bạn có chắc chắn muốn hủy đăng ký sim này?
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <form onSubmit={handleSubmit(updateRoomh)}>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                type="submit"
                onClick={() => {}}
              >
                Confirm
              </button>
            </form>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function SimWaitingList() {
  const [selectedHuy, setSelectedHuy] = useState<RoomInterface>();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [roomList, setRoomList] = useState<RoomInterface[]>([]);
  const [user, setUser] = useState<userInterface>();
  const getAccountDetails = async () => {
    try {
      const data = await accountData();
      setUser(data);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess());
      getAccountDetails();
      getListSim();
    } else {
      console.log("No token found");
    }
  }, [user]);
  const getListSim = async () => {
    try {
      console.log("đây là user", user?.email ?? "");
      const data = await getRoomByAccount(user?.email ?? "");

      setRoomList(data);
      console.log("Danh sách sim đã đăng ký và chờ đấu giá:", roomList);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy danh sách sim:", error);
    }
  };
  const buttonHuyClick = (room: RoomInterface) => {
    setSelectedHuy(room);
    setOpen(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="w-full flex flex-col sm:flex-col md:flex-row items-start justify-between max-h-fit profile-top-title-wrap pt-10">
        <h2 className=" py-1 md:text-3xl lg:text-[40px] font-bold drop-shadow-2xl mb-3 text-white">
          {" "}
          Sim chờ đấu giá{" "}
        </h2>
      </div>
      <div className="mb-5 text-white text-lg">
        Danh sách sim đã đăng ký và chờ đấu giá
      </div>
      <div className="border-2 rounded-2xl border-inherit p-3">
        <table className="min-w-full divide-y divide-gray-200  text-center">
          <thead className="text-base ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3   font-medium text-white uppercase tracking-wider"
              >
                Số sim
              </th>
              <th
                scope="col"
                className="px-6 py-3   font-medium text-white uppercase tracking-wider"
              >
                Nhà mạng
              </th>
              <th
                scope="col"
                className="px-6 py-3  font-medium text-white uppercase tracking-wider"
              >
                Thời gian đấu giá
              </th>

              {/* <th scope="col" className="px-6 py-3   font-medium text-white uppercase tracking-wider">
                                Hành động
                            </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roomList.map((room, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 ">{room.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{room.provider}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {String(room.start_at)}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => buttonHuyClick(room)}>Hủy đăng ký</button>

                                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <ConfirmLog setOpen={setOpen} selectedHuy={selectedHuy} user={user} />
      )}{" "}
    </div>
  );
}
export default SimWaitingList;
