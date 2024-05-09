import { faSimCard, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ParticipantInterface, RoomInterface } from "../../types/RoomInterface";
import { formatDate, endTimeCalc, formatMoney, calcTime } from "./utils/format";
import { useEffect, useState } from "react";
import { successBidder } from "./utils/successParticipant";
import React from "react";
import { useForm } from "react-hook-form";
import { getRoomByCode } from "../../features/axios/api/room/RoomDetails";
import { updateRoom } from "../../features/axios/api/room/UpdateRoom";
import { useDispatch } from "react-redux";
import { string, number } from "yup";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import { clearUserDetails } from "../../features/redux/slices/account/accountDetailsSlice";
import { loginSuccess } from "../../features/redux/slices/account/accountLoginAuthSlice";
import { userInterface } from "../../types/UserInterface";
import { getSimByNumber } from "../../features/axios/api/sim/SimDetails";
import { SimInterface } from "../../types/SimInterface";
import AuctionInfor from "./AuctionInfor";
import { NotificationInterface } from "../../types/NotificationInterface";

interface HappeningAuctionProps {
  auctionDetails: RoomInterface;
  fromHappeningList: boolean;
}

const HappeningAuction: React.FC<HappeningAuctionProps> = ({ auctionDetails, fromHappeningList }) => {

  const dispatch = useDispatch();
  
  const [accountDetails, setAccountDetails] = useState<userInterface>();
  const [hasError, setHasError] = useState(false); 
  const [error, setError] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  const handlePriceChange = (value: number) => {
      setPrice(value);// Assuming the current highest price is 50,000

      if (auctionDetails && auctionDetails?.price) {
        if (value <= auctionDetails?.price) {
            setError(`*Giá đưa ra phải lớn hơn giá cao nhất hiện tại là ${formatMoney(auctionDetails.price)} đồng.`);
        } else {
            setError('');
        }
      }
  };

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

  const [auctionInfor, setAuctionInfor] = useState<RoomInterface>();

  const {
      setValue,
      formState: { errors },
  } = useForm<RoomInterface>();

  useEffect(() => {
      const userInfo = async () => {
        try {
          if (auctionDetails.code) {
            const data = await getRoomByCode(auctionDetails.code);
            setAuctionInfor(data);
          }
          
        }
        catch (error) {
          setAuctionInfor(undefined);
        }
      };
      userInfo();
  }, []);

  // const [SimInfor, setSimInfor] = useState<SimInterface>();
  // useEffect(() => {
  //   const userInfo = async () => {
  //     try {
  //       const data = await getSimByNumber(auctionDetails.phone ?? '');
  //       setSimInfor(data);
  //       setHasError(false);
  //     }
  //     catch (error) {
  //       setSimInfor(undefined);
  //       setHasError(true);
  //     }
  //   };
  //   userInfo();
  // }, [AuctionInfor]);
  
  


  const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (auctionInfor && auctionInfor?.participants && accountDetails) {
          let participant: ParticipantInterface = {
            name: accountDetails?.name ?? "",
            email: accountDetails.email ?? "",
            phone: accountDetails.phone ?? "",
            highest_price: price ?? 0,
            status: "Hàng đợi",
          }

          auctionInfor.participants.push(participant)
          auctionInfor.price = participant.highest_price
          updateRoom(auctionInfor)
          setShowModal(false)
          const reloadPage = () => {
            window.location.reload(); // Tải lại trang
          };
      
          const reloadInterval = setInterval(reloadPage, 500); // 1000 milliseconds = 1 giây
      
          return () => {
            clearInterval(reloadInterval); // Xóa bộ đếm khi component unmount
          }
      }
  }

    useEffect(() => {
        const fetchSuccessBidder = async () => {
          try {
            const result = await successBidder(auctionDetails?.participants ?? []);
            if (result) {
              setParticipant(result.successbidder); // Extract successbidder property from result
            } else {
              setParticipant(null); // Handle case where result is falsy (e.g., null or undefined)
            }
          } catch (error) {
            // Handle error if necessary
          }
        };
      
        fetchSuccessBidder();
      }, [auctionDetails]); // Dependency array ensures useEffect runs when auctionDetails changes
      
      // Define state to hold the result of successBidder
      const [participant, setParticipant] = useState<ParticipantInterface[] | null>(null);
    

    
    const [timeDisplay, setTimeDisplay] = React.useState<{ days: number, hours: number, minutes: number, seconds: number }>(
        calcTime(endTimeCalc(auctionDetails?.start_at || new Date(), auctionDetails?.time_limit || 0))
    );
    
    const updateCounters = () => setTimeDisplay(calcTime(endTimeCalc(auctionDetails?.start_at || new Date(), auctionDetails?.time_limit || 0)));
    
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeDisplay(calcTime(endTimeCalc(auctionDetails?.start_at || new Date(), auctionDetails?.time_limit || 0)));
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };

    const href = `/auction/details/${auctionDetails.code}`;
    return (
    <div className="border-white border-2 py-4 px-8  rounded-lg bg-white bg-opacity-10 mb-4 mx-[5%]">
        <div className="lg:grid grid-cols-7 space-x-2">
        <div className="lg:col-span-1 flex justify-center">
          <FontAwesomeIcon icon={faSimCard} size="6x" className="hidden lg:block"/>
        </div>
        <div className="lg:col-span-6">
          <div className="grid lg:grid-cols-2">
              <p className="text-white mb-2">
                  <strong>Số điện thoại:</strong> {auctionDetails?.phone}
              </p>
              <p className="text-white mb-2">
                  <strong>Số người tham gia: </strong>{auctionDetails?.participants?.length}
              </p>
          </div>

          <div className="grid lg:grid-cols-2">
              <p className="text-white mb-2">
                  <strong>Thời điểm bắt đầu: </strong> {formatDate(auctionDetails?.start_at ?? new Date())}
              </p>

              <p className="text-white mb-2">
                    <strong> Thời gian còn lại: </strong>{-timeDisplay.days} ngày {-timeDisplay.hours} giờ {-timeDisplay.minutes} phút {-timeDisplay.seconds} giây
              </p>
              
          </div>

          <div className="grid lg:grid-cols-2">
              <p className="text-white mb-2">
                <strong>Nhà cung cấp: </strong>{auctionDetails.provider}
              </p>

              <p className="text-white mb-2">
                  {/* <strong>Giá khởi điểm: </strong> {formatMoney(SimInfor?.starting_price ?? 0)} */}
              </p>
          </div>

          <div className="border-2 border-white mb-2"></div>

          <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2 lg:mb-0">
            <strong>Giá cao nhất: </strong>{formatMoney(participant ? (participant.length > 0 ? participant[0].highest_price : 0) : 0)}
            </p>
            
            {
              !fromHappeningList ? (
                <div className="flex lg:justify-end">
                  <button className="text-black font-bold p-2 w-full lg:w-[50] items-center bg-white rounded-lg hover:bg-gray-300 hover:bg-opacity-50"
                  onClick={openModal}>
                  Tham gia đấu giá
                  </button>
                </div>
              ) : (
                <div className="flex lg:justify-end">
                  <a href={href} className="w-full">
                    <button className="text-black font-bold p-2 w-full lg:w-[50] items-center bg-white rounded-lg hover:bg-gray-300 hover:bg-opacity-50"
                    >
                    Xem chi tiết
                    </button>
                  </a>
                </div>
              )
            }
            

          </div>
        </div>
        
      </div>

      {showModal && (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-500 bg-opacity-50 w-full h-screen z-50">
          <div className="bg-white rounded-lg w-[400px]">
            <div className="bg-background rounded-t-lg flex w-full items-center">
              <p className="text-lg font-bold w-full ml-4 flex justify-center">Tham gia đấu giá</p>
              <div className="flex justify-end bg-background hover:bg-red-300 p-2 rounded-tr-lg">
                <FontAwesomeIcon
                  icon={faTimes}
                  size="2x"
                  className="cursor-pointer"
                  onClick={closeModal}
                />
              </div>
            </div>
            <div className="text-background w-auto min-h-[100px] m-8 space-y-8 ">

              <div className="relative mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="text-[13px] font-bold"
                  >Giá đưa ra
                </label>
                <input
                  type="number"
                  onChange={(event) => handlePriceChange(Number(event.target.value))}
                  className="block min-h-[auto] border-[1px] border-background focus:border-blue-700 w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Vui lòng nhập số tiền." />
                
                <div className="flex items-center text-[10px] text-red-800" role="alert">
                  <div className="flex justify-start">
                    {error && <span>{error}</span>}
                  </div>
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
      )}

      </div>
  );
}

export default HappeningAuction;