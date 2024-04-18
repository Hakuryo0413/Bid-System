import { useEffect, useState } from "react";
import { userInterface } from "../../types/UserInterface";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import { NotificationInterface } from "../../types/NotificationInterface";
import { getNotificationByAccount } from "../../features/axios/api/notification/NotificationDetails";
import createNewNotification from "../../features/axios/api/notification/CreateNotification";


export default function TestDB() {

  const [noti,setNoti] = useState<NotificationInterface>();

  const createNoti = async () =>{
    const data : NotificationInterface = {};
    data.account = "Tên tài khoản";
    data.content = "Nội dung thông báo";
    data.from = "Người gửi";
    data.state = true;

    const res = await createNewNotification(data);
    setNoti(res);
  }

  useEffect (() =>{
    createNoti();
  },[])

  console.log(noti)

  return (
    <div className="justify-center py-36 flex min-h-screen bg-background">
      <p>Hello</p>
    </div>
  );
}
