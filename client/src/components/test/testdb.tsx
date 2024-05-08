import { useEffect, useState } from "react";
import { userInterface } from "../../types/UserInterface";
import { accountData, getAccountsByEmail } from "../../features/axios/api/account/AccountsDetail";
import { NotificationInterface } from "../../types/NotificationInterface";
import { getNotificationByAccount } from "../../features/axios/api/notification/NotificationDetails";
import createNewNotification from "../../features/axios/api/notification/CreateNotification";
import { updateAccount } from "../../features/axios/api/account/UpdateAccount";
import deleteAccount from "../../features/axios/api/account/DeleteAccount";
import axios from "axios";
import apiConfig from "../../utils/apiConfig";
import { login } from "../../features/axios/api/account/AccountAuthentication";
import { LoginPayload } from "../../types/PayloadInterface";
import { getHistoryByAccount } from "../../features/axios/api/history/HistoryDetails";
import { HistoryInterface } from "../../types/HistoryInterface";


export default function TestDB() {

  const [accountDetails, setAccountDetails] = useState<userInterface>();
  const [history,setHistory] = useState<HistoryInterface>();
    const getAccountDetails = async () => {
    const data = await accountData();
    setAccountDetails(data);
  };
  const getHis = async (email: string) => {
    const data = await getHistoryByAccount(email);
    setHistory(data);
  }
  useEffect(() => {
    getAccountDetails();
  }, [])


  useEffect(() => {
    if (accountDetails) {
      getHis(accountDetails.email);
    }
  }, [accountDetails])

  console.log(history);
  return (
    <div className="justify-center py-36 flex min-h-screen bg-background">
      <p>Hello</p>
    </div>
  );
}
