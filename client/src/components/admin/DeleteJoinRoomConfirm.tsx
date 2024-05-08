import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { userInterface } from "../../types/UserInterface";
import {
  accountData,
  getAccountsByEmail,
  getAccountsById,
} from "../../features/axios/api/account/AccountsDetail";
import { updateAccount } from "../../features/axios/api/account/UpdateAccount";
import { ParticipantInterface, RoomInterface } from "../../types/RoomInterface";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import { updateRoom } from "../../features/axios/api/room/UpdateRoom";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../features/redux/slices/account/accountDetailsSlice";
import { loginSuccess } from "../../features/redux/slices/account/accountLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";

interface DeleteJoinRoomWindowProps {
  room: RoomInterface;
  onClose: () => void;
  onCloseButt: () => void;
}

const DeleteJoinRoomWindow: React.FC<DeleteJoinRoomWindowProps> = ({
  room,
  onClose,
  onCloseButt,
}) => {
  const dispatch = useDispatch();

  const [roomInfor, setRoomInfor] = useState<RoomInterface>();
  const [isDeleted, setDelete] = useState<boolean>(false);
  const [accountDetails, setAccountDetails] = useState<userInterface>();

  const getAccountDetails = async () => {
    const data = await accountData();
    setAccountDetails(data);
  };

  const token = localStorage.getItem("token");

  // cái này có thể để phòng trường hợp thoát ra nhưng mà chưa đăng xuất khiến token chưa bị xóa
  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
      getAccountDetails();
    }
    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch]);

  useEffect(() => {
    const roomInfo = async () => {
      try {
        const data = await getRoomByCode(room.code ?? "");
        setRoomInfor(data);
        //  setUserInfor(data);
      } catch (error) {
        setRoomInfor(undefined);
        // setUserInfor(undefined);
      }
    };
    roomInfo();
    // userInfo();
  }, []);

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (roomInfor && roomInfor.participants && accountDetails) {
      let participant: ParticipantInterface = {
        name: accountDetails?.name ?? "",
        email: accountDetails.email ?? "",
        phone: accountDetails.phone ?? "",
        highest_price: 0,
        status: "Hàng đợi",
      };

      // Tạo một mảng mới chỉ chứa các phần tử khác với participant muốn xóa
      roomInfor.participants = roomInfor.participants.filter(
        (p) => p.email !== participant.email
      );

      // Gán mảng participants của roomInfor bằng mảng mới đã cập nhật

      // Gọi hàm updateRoom với roomInfor mới đã cập nhật
      updateRoom(roomInfor);

      console.log("OK");
      onClose();
    }
  };
  return (
    <div>
      {roomInfor && !isDeleted && (
        <div className="fixed inset-0  flex items-center justify-center bg-white bg-opacity-20 w-full h-screen z-50">
          <div className="bg-white rounded-lg md:w-[400px] w-[90%]">
            <div className="relative bg-background rounded-t-lg flex w-full items-center">
              <p className="text-white md:text-lg text-sm font-bold w-full p-2 ml-4 flex justify-center">
                Huỷ đăng ký đấu giá
              </p>

              <div className="absolute top-0 right-0 flex justify-end bg-background hover:bg-red-300 p-2 rounded-tr-lg">
                <FontAwesomeIcon
                  icon={faTimes}
                  size="2x"
                  className="cursor-pointer text-white px-2"
                  onClick={onCloseButt}
                />
              </div>
            </div>

            <div className="text-background min-h-[100px] w-auto mx-8 my-4 md:text-[18px] text-small">
              <div className="text-left mb-8 text-sm">
                <div className="mb-2">
                  <p className="font-bold">Email người tham gia</p>

                  <p className="py-2 px-4 bg-gray-300 rounded mb-2 relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">
                    {localStorage.getItem("username") ?? ""}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Tên nhà cung cấp</p>

                  <p className="py-2 px-4 bg-gray-300 rounded mb-2 relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">
                    {room.provider ?? ""}
                  </p>
                </div>

                <div className="mb-2">
                  <p className="font-bold">Mã phòng</p>
                  <p className="py-2 px-4 bg-gray-300 rounded mb-2 relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">
                    {room.code ?? ""}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Số điện thoại</p>
                  <p className="py-2 px-4 bg-gray-300 rounded mb-2 relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">
                    {room.phone ?? ""}
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="font-bold bg-green-500 text-white px-8 py-2 rounded-lg w-[48%] relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40"
                  onClick={buttonHandle}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DeleteJoinRoomWindow;
