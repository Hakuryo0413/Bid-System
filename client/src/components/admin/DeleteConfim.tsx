import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { userInterface } from "../../types/UserInterface";
import { getAccountsByEmail, getAccountsById } from "../../features/axios/api/account/AccountsDetail";
import deleteAccount from "../../features/axios/api/account/DeleteAccount";

interface DeleteConfirmProps {
    user: userInterface;
    onClose: () => void;
    onCloseButt: () => void;
}


const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ user, onClose, onCloseButt }) => {

    const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
        deleteAccount(user._id ?? '')
        onClose(); 
    }

    
    return (
    <div>
        <div className="fixed inset-0  flex items-center justify-center bg-white bg-opacity-20 w-full h-screen z-50">
            <div className="bg-white rounded-lg md:w-[400px] w-[90%]">
            <div className="relative bg-background rounded-t-lg flex w-full items-center">
            {user.role === "user" && (<p className="text-white md:text-lg text-sm font-bold w-full p-2 ml-4 flex justify-center">Xác nhận xóa người dùng</p>)}
            {user.role === "provider" && (<p className="text-white md:text-lg text-sm font-bold w-full p-2 ml-4 flex justify-center">Xác nhận xóa nhà cung cấp</p>)}
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
                    {user.role === "user" && (<p>Người kiểm duyệt có chắc chắn xóa người dùng <strong>{user.name}</strong> không?</p>)}
                    {user.role === "provider" && (<p>Người kiểm duyệt có chắc chắn xóa nhà cung cấp <strong>{user.name}</strong> không?</p>)}
                </div>
                
    
                <div className="flex justify-center space-x-4">
                    <button type="submit" className="font-bold bg-gray-500 text-white px-8 py-2 rounded-lg w-[48%] relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40" onClick={onCloseButt}>
                        Hủy
                    </button>
                    <button className="font-bold bg-red-700 text-white px-8 py-2 rounded-lg w-[48%] relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-red-500 hover:before:-translate-x-40" onClick={buttonHandle}>
                        Xóa
                    </button>
                </div>
                
            </div>
            </div>
        </div>
    </div>
    
    )
}

export default DeleteConfirm;