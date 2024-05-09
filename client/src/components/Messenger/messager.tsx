import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Socket, io } from "socket.io-client";
import { userInterface } from "../../types/UserInterface";
import { loginSuccess } from "../../features/redux/slices/account/accountLoginAuthSlice";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import configKeys from "../../utils/config";
import { fetchUser } from "../../features/redux/slices/account/accountDetailsSlice";
import { createConversation, getUserConversations } from "../../features/axios/api/messenger/conversation";
import { getUserMessages, postUserMessages } from "../../features/axios/api/messenger/messages";
import Conversations from "./user/UserConversations";
import Message from "./user/UserMessage";
import { Tooltip } from "@material-tailwind/react";
import { IoPaperPlaneSharp } from "react-icons/io5";
// import { ChatList, IChatItemProps } from "react-chat-elements";
import { ConversationInterface, MessagesInterface } from "../../types/messengerInterface";
import SearchConversation from "./user/SearchConversations";

interface arrivalMessage {
  "sender": string,
  "text": string,
  "createdAt": any,
}

function Messenger() {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const socket = useRef<Socket>({} as Socket);
  const [user, setUser] = useState<userInterface>({} as userInterface);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<ConversationInterface>({ members: [] } as ConversationInterface);
  const [messages, setMessages] = useState<MessagesInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<arrivalMessage>({} as arrivalMessage);
  const [onlineUsers, setOnlineUsers] = useState<userInterface[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<userInterface | null>(null);

  // Define function to handle selected account
  const handleSelectedAccount = (account: userInterface) => {
    // Set selected account to state
    setSelectedAccount(account);
  };


  useEffect(() => {
    if (selectedAccount) {
      const createConv = async () => {
        if (user?._id && selectedAccount._id) {
          const res = await createConversation(user?._id, selectedAccount._id);
          if (res) {
            getConversations();
          }
        }
      };
      createConv();
    }
  }, [selectedAccount])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess());
      getAccountDetails();
    }
  }, [dispatch]); // useEffect sẽ được gọi lại mỗi khi dispatch thay đổi

  const getAccountDetails = async () => {
    try {
      const data = await accountData();
      if (data == null) {
        return;
      }
      setUser(data);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
    }
  };

  useEffect(() => {
    socket.current = io(configKeys.SOCKET_PORT);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data?.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user?._id);
    socket?.current?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user?._id]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const getConversations = async () => {
    if (user) {
      if (user._id) {
        const res = await getUserConversations(user?._id);
        if (res == null) {
          return;
        }
        setConversations(res);
      }
    }
  };

  useEffect(() => {
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await getUserMessages(currentChat?._id);
          if (res == null) {
            return;
          }
          setMessages(res);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat?._id,
      sender: user?._id,
      text: newMessage,
    };

    const receiverId = currentChat?.members?.find(
      (member: any) => member !== user?._id
    );

    socket?.current?.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await postUserMessages(message);
      if (res == null) {
        return;
      }
      setMessages([...messages, res]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col sm:flex-col md:flex-row items-start justify-between max-h-fit profile-top-title-wrap pt-10">

        <h2 className=" py-1 md:text-3xl lg:text-[40px] font-bold drop-shadow-2xl mb-3 text-white"> Trò chuyện </h2>
        {/* button with text */}
        {/* svg lock button  */}
      </div>
      {/* add search user to create new conversation*/}
      <SearchConversation onSelectAccount={handleSelectedAccount} />
      <div className="pt-4 h-screen pb-[70px] flex mx-auto p-2 mt-4 rounded border border-border rounded-2xl text-white">
        <div className="flex-auto p-3 w-1/3">
          <div>
            <div className="h-96 overflow-y-auto">
              {conversations?.map((c, index) => (
                <div onClick={() => setCurrentChat(c)} key={index}>
                  <Conversations
                    conversation={c}
                    currentUser={user}
                    onlineUsers={onlineUsers}
                  />
                </div>
              ))}
            </div>

          </div>

        </div>

        <div className="flex-auto p-3 w-64 border-l pr-4 w-2/3">
          <div className="flex flex-col justify-between h-full relative">
            {currentChat ? (
              <>
                <div className="pr-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                  {messages?.map((msg: any, index: any) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={msg}
                        own={msg?.sender === user?._id}
                        id={msg?.sender}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <textarea
                    className="w-10/12 h-24 p-3 focus:outline-none text-black"
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write something..."
                    value={newMessage}
                  />
                  <Tooltip content="Send">
                    <button
                      onClick={handleSubmit}
                      className="text-3xl text-blue-600"
                    >
                      <IoPaperPlaneSharp />
                    </button>
                  </Tooltip>
                </div>
              </>
            ) : (
              <span className="absolute top-10 text-4xl text-gray-400 cursor-default ">
                Mở cửa sổ trò chuyện để bắt đầu nhắn tin.
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Messenger;
