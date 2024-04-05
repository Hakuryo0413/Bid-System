import { faSimCard, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ParticipantInterface, RoomInterface } from "../../types/RoomInterface";
import { formatDate, endTimeCalc, formatMoney, calcTime } from "./utils/format";
import { useEffect, useState } from "react";
import { successBidder } from "./utils/successParticipant";
import React from "react";

interface HappeningAuctionProps {
    auctionDetails: RoomInterface;
}

const HappeningAuction: React.FC<HappeningAuctionProps> = ({ auctionDetails }) => {
    useEffect(() => {
        const fetchSuccessBidder = async () => {
          try {
            const result = await successBidder(auctionDetails?.participants ?? []);
            if (result) {
              setSuccessfulBidder(result.successbidder); // Extract successbidder property from result
            } else {
              setSuccessfulBidder(null); // Handle case where result is falsy (e.g., null or undefined)
            }
          } catch (error) {
            // Handle error if necessary
          }
        };
      
        fetchSuccessBidder();
      }, [auctionDetails]); // Dependency array ensures useEffect runs when auctionDetails changes
      
      // Define state to hold the result of successBidder
      const [successfulBidder, setSuccessfulBidder] = useState<ParticipantInterface | null>(null);
    

    
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
                    <strong> Thời gian còn lại: </strong>{-timeDisplay.minutes}:{-timeDisplay.seconds}
              </p>
              
              

              
          </div>

          <div className="border-2 border-white mb-2"></div>

          <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2 lg:mb-0">
            <strong>Giá cao nhất: </strong>{formatMoney(successfulBidder?.highest_price ?? 0)}
            </p>
            
            <div className="flex lg:justify-end">
                <button className="text-black font-bold p-2 w-full lg:w-[50] items-center bg-white rounded-lg hover:bg-gray-300 hover:bg-opacity-50"
                onClick={openModal}>
                Tham gia đấu giá
                </button>
            </div>

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
              <div className="relative mb-3" data-twe-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] border-[1px] border-background focus:border-blue-700 w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-blue-700 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-blue-700 [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Họ và tên" />
                <label
                  htmlFor="exampleFormControlInput1"
                  className="pointer-events-none peer-focus:bg-white absolute left-3 top-0 mb-0 origin-[0_0] truncate mt-[0.37rem] leading-[1.6] text-background transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-blue-700 peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-blue-700"
                  >Họ và tên
                </label>
              </div>

              <div className="relative mb-3" data-twe-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] border-[1px] border-background focus:border-blue-700 w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-blue-700 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-blue-700 [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Giá đưa ra" />
                <label
                  htmlFor="exampleFormControlInput1"
                  className="pointer-events-none peer-focus:bg-white absolute left-3 top-0 mb-0 origin-[0_0] truncate mt-[0.37rem]  text-background transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-blue-700 peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-blue-700"
                  >Giá đưa ra
                </label>
                <div
                className="absolute w-full text-[10px] left-3 text-red-200"
                data-twe-input-helper-ref>
                *Lưu ý: Giá đưa ra phải lớn hơn giá cao nhất hiện tại là 50,000 đồng.
              </div>
              </div>

              <div className="flex justify-center">
                <button type="submit" className="font-bold bg-background text-white px-8 py-2 rounded-lg">
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