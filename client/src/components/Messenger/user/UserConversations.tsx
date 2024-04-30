import React, { useEffect, useState } from "react";
import configKeys from "../../../utils/config";
import axios from "axios";
import { userInterface } from "../../../types/UserInterface";

function Conversations({ conversation, currentUser, onlineUsers }: any) {
  const [account, setAccount] = useState<userInterface>();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const senderId = conversation?.members?.find(
      (m: Array<string>) => m !== currentUser?._id
    );

    const getUser = async () => {
      try {
        const res = await axios(
          `${configKeys.API_URL}account/id/${senderId}`
        );
        setAccount(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation.member, conversation?.members, currentUser?._id]);

  useEffect(() => {
    const onlineUser = onlineUsers?.filter(
      (f: any) => f.userId === account?._id
    );
    if (onlineUser?.length > 0) {
      setIsOnline(true);
    }
  }, [account?._id, onlineUsers]);


  return (
    <div className="flex items-center mt-5 p-3 cursor-pointer hover:bg-blue-gray-50 relative border-b pr-4">
      <img
        className="mr-5 w-10 h-10 rounded-full object-cover"
        src={require("../../../assets/images/user.png")}
        alt=""  
      />
      <div className="flex flex-col">
        <span className="font-semibold">{account?.name}</span>
        {isOnline ? (
          <span className="text-gray-500">online</span>
        ) : (
          <span className="text-gray-500">offline</span>
        )}
      </div>
      {isOnline ? (
        <div className="absolute top-3 left-10 h-3 w-3 rounded-full bg-limeGreen"></div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}

export default Conversations;