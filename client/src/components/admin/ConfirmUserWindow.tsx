import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import { updateRoom } from "../../features/axios/api/room/UpdateRoom";
import { ParticipantInterface, RoomInterface } from "../../types/RoomInterface";
import { formatMoney } from "../auction/utils/format";
import { userInterface } from "../../types/UserInterface";
import { getAccountsByEmail, getAccountsById } from "../../features/axios/api/account/AccountsDetail";
import { updateAccount } from "../../features/axios/api/account/UpdateAccount";

interface ConfirmUserWindowProps {
    user: userInterface;
    onClose: () => void;
    onCloseButt: () => void;
}


const ConfirmUserWindow: React.FC<ConfirmUserWindowProps> = ({ user, onClose, onCloseButt }) => {
    const [userInfor, setUserInfor] = useState<userInterface>();

    useEffect(() => {
        const userInfo = async () => {
          try {
            const data = await getAccountsByEmail(user.email);
            setUserInfor(data);
          }
          catch (error) {
            setUserInfor(undefined);
          }
        };
        userInfo();
    }, []);



    const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (userInfor) {
            console.log("update account", user)
            userInfor.state = true
            updateAccount(userInfor)
        }
        // onClose(); 
    }

    
    return (
    <div className="fixed inset-0  flex items-center justify-center bg-white bg-opacity-5 w-full h-screen z-50">
        <div className="bg-white rounded-lg md:w-[400px] w-[90%]">
        <div className="relative bg-background rounded-t-lg flex w-full items-center">
            <p className="text-white md:text-lg text-sm font-bold w-full p-2 ml-4 flex justify-center">Duyệt người dùng</p>
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
                    <p className="font-bold">Tên người dùng</p>
                    <p className="py-2 px-4 bg-gray-300 rounded mb-2 relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">{user.name ?? ""}</p>
                </div>

                <div className="mb-2">
                    <p className="font-bold">Email</p>
                    <p className="py-2 px-4 bg-gray-300 rounded mb-2 relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">{user.email ?? ""}</p>
                </div>
                <div className="mb-2">
                    <p className="font-bold">Số điện thoại</p>
                    <p className="py-2 px-4 bg-gray-300 rounded mb-2 relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">{user.phone ?? ""}</p>
                </div>
            </div>
            

            <div className="flex justify-center space-x-4">
                <button type="submit" className="font-bold bg-green-500 text-white px-8 py-2 rounded-lg w-[48%] relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40" onClick={buttonHandle}>
                    Duyệt
                </button>
                <button className="font-bold bg-red-700 text-white px-8 py-2 rounded-lg w-[48%] relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-red-500 hover:before:-translate-x-40" onClick={buttonHandle}>
                    Xóa
                </button>
            </div>
            
        </div>
        </div>
    </div>
    )
}

export default ConfirmUserWindow;