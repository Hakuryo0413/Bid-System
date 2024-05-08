import { useState, useEffect } from "react";
import "../../assets/css/HistoryAuctionPage.css";
import UserHomePage from "../user/UserHomePage";


import { useDispatch } from "react-redux/es/exports";
import "react-toastify/dist/ReactToastify.css";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import { loginSuccess } from "../../features/redux/slices/account/accountLoginAuthSlice";
import { userInterface } from "../../types/UserInterface";
import { getNotificationByAccount } from "../../features/axios/api/notification/NotificationDetails";
import { NotificationInterface } from "../../types/NotificationInterface";
import NotiCard from "../../components/auction/NotiCard";
import deleteNotification from "../../features/axios/api/notification/DeleteNotification";

const Notification = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<[NotificationInterface] | []>([]);
  const [accountDetails, setAccountDetails] = useState<userInterface | null>(
    null
  ); // Đảm bảo setAccountDetails có thể nhận giá trị null

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("get token")
    if (token) {
      console.log("login success");
      dispatch(loginSuccess());
      fetchData();
    }
  }, [dispatch]); // useEffect sẽ được gọi lại mỗi khi dispatch thay đổi

  const getAccountDetails = async () => {
    try {
      const data = await accountData();
      console.log("data", data);
      setAccountDetails(data);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await accountData();
        console.log("data", data);
        setAccountDetails(data);
      } catch (error) {
        console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (accountDetails) {
      const fetchNotifications = async () => {
        try {
          console.log("1234");
          const notiData = await getNotificationByAccount(accountDetails.email);
          setNotifications(notiData);
          console.log(notiData);
          console.log(accountDetails);
        } catch (error) {
          console.error("Lỗi xảy ra khi thiết lập lịch sử đấu giá:", error);
        }
      };

      fetchNotifications();
    }
  }, [accountDetails]); // Chỉ gọi lại khi accountDetails thay đổi

  const fetchData = async () => {
    console.log("buoc 1");
    await getAccountDetails();
    console.log("buoc 2");
    console.log(accountDetails);
    if (accountDetails) {
      console.log("buoc 3");
      try {
        console.log("1234");
        const notiData = await getNotificationByAccount(accountDetails.email);
        setNotifications(notiData);

        console.log(notiData);
        console.log(accountDetails);

      } catch (error) {
        console.error("Lỗi xảy ra khi thiết lập lịch sử đấu giá:", error);
      }
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
      fetchData(); // Sau khi xóa thành công, cập nhật lại danh sách thông báo
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <>
      <UserHomePage />
      <h1 className="absolute top-[15%] left-[25vw] text-[1.75rem] font-bold">Thông báo</h1>

      {notifications?.length > 0 ? (
            <div className="relative top-[-13vw] left-[25%] border-[2px] border-solid border-[#2B394F] rounded-xl w-[65%]">
                {notifications
                    .slice() // Tạo một bản sao của mảng notifications
                    .sort((a, b) => {
                        if (!a.created_at || !b.created_at) return 0; // Kiểm tra xem created_at có giá trị không
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    }) // Sắp xếp theo thời gian giảm dần
                    .map((noti) => (
                        <NotiCard key={noti._id} noti={noti} onDelete={handleDeleteNotification}/>
                    ))
                }
            </div>
        ) : (
            <div className="relative top-[-25vh] left-[25%] border-[2px] border-solid border-[#2B394F] rounded-xl w-[65%]">
                <p className="p-2">Bạn chưa nhận được thông báo nào.</p>
            </div>
        )}

      {/* {notifications?.length > 0 ? (
        <div className="relative top-[-13vw] left-[25%] border-[2px] border-solid border-[#2B394F] rounded-xl w-[65%]">
          {notifications.map((noti)=> (
                <NotiCard noti = {noti}/>
              )
              )}
        </div>

      ) : (
        <div className="relative top-[-25vh] left-[25%] border-[2px] border-solid border-[#2B394F] rounded-xl w-[65%]">
          <p className="p-2">Bạn chưa nhận được thông báo nào.</p>
        </div>
      )
      } */}
    </>
  )
};

export default Notification;
