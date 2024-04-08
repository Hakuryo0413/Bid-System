import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import { RootState } from "../../features/redux/reducers/Reducer";
import { clearUserDetails } from "../../features/redux/slices/account/accountDetailsSlice";
import { loginSuccess } from "../../features/redux/slices/account/accountLoginAuthSlice";
import { ParticipantInterface } from "../../types/RoomInterface";
import { userInterface } from "../../types/UserInterface";
import ConfirmSuccessfulBidder from "./confim action/ConfirmSuccessfulBidder";
import { formatMoney } from "./utils/format";
import { Button } from "@mui/material";

interface ParticipantsListSmallProps {
    participants: ParticipantInterface [],
    code: string,
}

const ParticipantsListSmall: React.FC<ParticipantsListSmallProps> = ({ participants, code }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );
  const [isLoading, setIsLoading] = useState(true);
  
  const [accountDetails, setAccountDetails] = useState<userInterface>();

  const getAccountDetails = async () => {
    const data = await accountData();
    setAccountDetails(data);
  }
  
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
  
  const [items, setItems] = useState<React.ReactNode>();

    const handleButtonClick = (participant: ParticipantInterface) => {
        const onClose = () => {
          setItems(undefined);
          window.location.reload();
        }
        const onCloseButt = () => {
          setItems(undefined);
        }
        if (participant.status === 'Đang chờ xác nhận') {
          setItems(<ConfirmSuccessfulBidder code={code} participants={participants} onClose={onClose} onCloseButt={onCloseButt}/>)
        } 
    }

    // Mảng lưu trữ màu của từng trạng thái.
    const statusColors: Record<string, string> = {
        'Đang chờ xác nhận': '#B8E1FF',
        'Đấu giá thành công': '#4FFBDF',
        'Đấu giá thất bại': '#FF6F91',
        'Đang chờ thanh toán': '#FEFEDF',
        'Hàng đợi': '#D8E4EA',
    };

    // Lấy màu theo trạng thái
    const getStatusColor = (status: string) => {
        return statusColors[status] || 'transparent';
    };

    const isDisable = (status: string) => {
        if (status === "Đang chờ xác nhận" && accountDetails?.role === 'admin') {
            return false;
        }
        return true
    }

    return (
        <div className="space-y-4 mt-4 overflow-y-auto h-[400px]">
        {
        participants?.map((participant) => (
            <div className="border-white text-background border-2 py-4 px-4 rounded-lg bg-white">
            <table className="w-full">
                <tbody>
                <tr>
                    <td><strong>Họ và tên:</strong></td>
                    <td className="flex justify-end">{participant.name}</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td className="flex justify-end">{participant.email}</td>
                </tr>
                <tr>
                    <td><strong>Số điện thoại:</strong></td>
                    <td className="flex justify-end">{participant.phone}</td>
                </tr>
                <tr>
                    <td><strong>Giá cao nhất:</strong></td>
                    <td className="flex justify-end">{formatMoney(participant.highest_price ?? 0)}</td>
                </tr>
                </tbody>
            </table>

            <div className="mt-4">
                <Button
                style={{
                    backgroundColor: getStatusColor(participant.status),
                    border: '1px',
                    borderRadius: '4px',
                    padding: '8px',
                    color: "black",
                    fontWeight: 'bold',
                    width: '100%',
                    pointerEvents: isDisable(participant.status)  ? 'none' : 'auto' ,
                    cursor: isDisable(participant.status) ? 'default' : 'pointer',
                }}
                onClick={() => handleButtonClick(participant)}
                >
                {participant.status}
                </Button>
            {items}
            </div>
            </div>
        ))
        }
    </div>
)}

export default ParticipantsListSmall;