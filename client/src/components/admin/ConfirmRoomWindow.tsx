import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { userInterface } from "../../types/UserInterface";
import {
  getAccountsByEmail,
  getAccountsById,
} from "../../features/axios/api/account/AccountsDetail";
import { updateAccount } from "../../features/axios/api/account/UpdateAccount";
import DeleteConfirm from "./DeleteConfim";
import { RoomInterface } from "../../types/RoomInterface";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import { updateRoom } from "../../features/axios/api/room/UpdateRoom";
import DeleteRoomConfirm from "./DeleteRoomConfirm";

interface ConfirmRoomWindowProps {
  room: RoomInterface;
  onClose: () => void;
  onCloseButt: () => void;
}

const ConfirmRoomWindow: React.FC<ConfirmRoomWindowProps> = ({
  room,
  onClose,
  onCloseButt,
}) => {
  const [roomInfor, setRoomInfor] = useState<RoomInterface>();
  const [isDeleted, setDelete] = useState<boolean>(false);
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

  const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //  console.log(userInfor);
    if (roomInfor) {
      roomInfor.state = "Chờ đấu giá";
      updateRoom(roomInfor);
      console.log("after", roomInfor);
    }
    /*  if (userInfor) {
      userInfor.state = true;
      updateAccount(userInfor);
      console.log("after", userInfor);
    } */
    onClose();
  };

  const buttonDeleteHandle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDelete(true);
  };

  return (
    <div>
      {roomInfor && !isDeleted && (
        <div className="fixed inset-0  flex items-center justify-center bg-white bg-opacity-20 w-full h-screen z-50">
          <div className="bg-white rounded-lg md:w-[400px] w-[90%]">
            <div className="relative bg-background rounded-t-lg flex w-full items-center">
              <p className="text-white md:text-lg text-sm font-bold w-full p-2 ml-4 flex justify-center">
                Duyệt phòng đấu giá
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
                  Duyệt
                </button>
                <button
                  className="font-bold bg-red-700 text-white px-8 py-2 rounded-lg w-[48%] relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-red-500 hover:before:-translate-x-40"
                  onClick={buttonDeleteHandle}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeleted && (
        <DeleteRoomConfirm
          room={room}
          onClose={onClose}
          onCloseButt={onCloseButt}
        />
      )}
    </div>
  );
};

export default ConfirmRoomWindow;
