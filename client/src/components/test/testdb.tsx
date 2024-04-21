import { useEffect, useState } from "react";
import { userInterface } from "../../types/UserInterface";
import { accountData, getAccountsByEmail } from "../../features/axios/api/account/AccountsDetail";
import { NotificationInterface } from "../../types/NotificationInterface";
import { getNotificationByAccount } from "../../features/axios/api/notification/NotificationDetails";
import createNewNotification from "../../features/axios/api/notification/CreateNotification";
import { updateAccount } from "../../features/axios/api/account/UpdateAccount";


export default function TestDB() {

  const [account, setAccount] = useState<userInterface>();

  const getAccount = async () => {
    const data = await getAccountsByEmail("mmunt59@gmail.com");
    setAccount(data);
  }

  const _updateAccount = async () => {
    if (account) {
      account.name = "hi";
      if (account._id) {
        const data = await updateAccount(account, account._id)
        setAccount(data)
      }
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  useEffect(() => {
    _updateAccount();
  }, [account])

  console.log(account)

  return (
    <div className="justify-center py-36 flex min-h-screen bg-background">
      <p>Hello</p>
    </div>
  );
}
