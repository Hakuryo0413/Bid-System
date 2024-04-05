import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ParticipantInterface, RoomInterface } from "../../../types/RoomInterface";
import { formatMoney } from "../utils/format";
import { useForm } from "react-hook-form";
import { getRoomByCode } from "../../../features/axios/api/room/RoomDetails";
import { update } from "lodash";
import { updateRoom } from "../../../features/axios/api/room/UpdateRoom";

interface ConfirmSuccessfulBidderProps {
    code: string;
    participants: ParticipantInterface[],
    onClose: () => void;
    onCloseButt: () => void;
}


const ConfirmSuccessfulBidder: React.FC<ConfirmSuccessfulBidderProps> = ({ code, participants, onClose, onCloseButt }) => {
    const [auctionInfor, setAuctionInfor] = useState<RoomInterface>();

    const {
        setValue,
        formState: { errors },
    } = useForm<RoomInterface>();

    useEffect(() => {
        const userInfo = async () => {
          try {
            const data = await getRoomByCode(code);
            setAuctionInfor(data);
          }
          catch (error) {
            setAuctionInfor(undefined);
          }
        };
        userInfo();
    }, []);



    const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (auctionInfor && auctionInfor?.participants && auctionInfor?.participants.length > 0) {
            let participants = auctionInfor.participants
            participants[0].status = "Đang chờ thanh toán"
            auctionInfor.participants[0].status = participants[0].status
            updateRoom(auctionInfor) 
        }
        
        onClose(); 
    }

    
    return (
    <div className="fixed inset-0  flex items-center justify-center bg-gray-500 bg-opacity-50 w-full h-screen z-50">
        <div className="bg-white rounded-lg w-[400px]">
        <div className="bg-background rounded-t-lg flex w-full items-center">
            <p className="text-white text-lg font-bold w-full ml-4 flex justify-center">Xác nhận người đấu giá thành công</p>
            <div className=" flex justify-end bg-background hover:bg-red-300 p-2 rounded-tr-lg">
            <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                className="cursor-pointer text-white"
                onClick={onCloseButt}
            />
            </div>
        </div>
        <div className="text-background min-h-[100px] w-auto mx-8 my-4 text-[18px]">
            <div className="text-left mb-4">
                <div className="mb-2">
                    <p className="font-bold">Họ và tên người đấu giá thành công</p>
                    <p className="py-2 px-4 bg-gray-300 rounded my-2">{participants.length > 0 ? participants[0].name : ""}</p>
                </div>

                <div className="mb-2">
                    <p className="font-bold">Số tiền đấu giá</p>
                    <p className="py-2 px-4 bg-gray-300 rounded my-2">{formatMoney(participants.length > 0 ? participants[0].highest_price : 0)}</p>
                </div>
            </div>
            

            <div className="flex justify-center">
            <button type="submit" className="font-bold bg-background text-white px-8 py-2 rounded-lg" onClick={buttonHandle}>
                Xác nhận
            </button>
            </div>
            
        </div>
        </div>
    </div>
    )
}

export default ConfirmSuccessfulBidder;