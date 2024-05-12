import { useState, useEffect } from "react";
import { getAllHistories, getRoomByCode } from "../../../features/axios/api/room/RoomDetails";
import { RoomInterface } from "../../../types/RoomInterface";
import { calcTime, calcTimeInSeconds } from "./format";
import { NotificationInterface } from "../../../types/NotificationInterface";
import createNewNotification from "../../../features/axios/api/notification/CreateNotification";
import { updateRoom } from "../../../features/axios/api/room/UpdateRoom";
import { HistoryInterface } from "../../../types/HistoryInterface";
import createNewHistory from "../../../features/axios/api/history/CreateHistory";

// Define a custom hook to fetch and process auction data
export function useAuctionData(): [RoomInterface[] | undefined, RoomInterface[] | undefined] {
  const [allAuctions, setAllAuctions] = useState<RoomInterface[]>();
  const [completedAuctions, setCompletedAuctions] = useState<RoomInterface[]>();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAllHistories();
        setAllAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setAllAuctions(undefined);
      }
    };

    fetchAuctions();
  }, []);

  useEffect(() => {
    if (!allAuctions) return;

    const completedAuction: RoomInterface[] = allAuctions.filter((auction) => {
      const timeIntervals = calcTime(auction.start_at ?? new Date());
      const auctionsTimeLimitInSeconds = (auction.time_limit ?? 0) * 60;
      const auctionsIntervalsInSeconds = calcTimeInSeconds(
        timeIntervals.days,
        timeIntervals.hours,
        timeIntervals.minutes,
        timeIntervals.seconds
      );

      return auctionsIntervalsInSeconds > 0 && auctionsIntervalsInSeconds >= auctionsTimeLimitInSeconds;
    });

    setCompletedAuctions(completedAuction);
  }, [allAuctions]);

  const [auctionInfor, setAuctionInfor] = useState<RoomInterface>();

  useEffect(() => {
    
    console.log("HI: ", completedAuctions)
    if (!completedAuctions) return;
    completedAuctions.forEach((auction) => {
      let time_intervals = calcTime(auction.start_at ?? new Date)
      let auctions_time_limit_in_seconds = (auction.time_limit ?? 0) * 60;
      let auctions_intervals_in_seconds = calcTimeInSeconds(time_intervals.days, time_intervals.hours, time_intervals.minutes, time_intervals.seconds)

      let participant = auction.participants || []
      if ((auction.state === "Chưa gửi thông báo" || auction.state === 'Đang đấu giá' 
      || (auction.state === "Chờ đấu giá"))) {
        if (participant.length > 0  && participant[0].highest_price > 0) {
          const len = auction.participants?.length ?? 0;
          const successBidder = auction.participants?.[len - 1];
          console.log(successBidder, auctionInfor)
          if (successBidder) {
            const notification: NotificationInterface = {
              account: successBidder.email,
              content: '',
              from: 'system',
              state: false,
              type: 'traTien',
              created_at: new Date(),
            };
            createNewNotification(notification);

            const history: HistoryInterface = {
              sim: auction.phone,
              room: auction.code,
              account: successBidder.email,
              state: 'Chưa thanh toán',
              created_at: new Date(),
            }
            createNewHistory(history);

            let auctionInfor_ = auction;
            auctionInfor_.state = 'Chờ thanh toán';
              if (auctionInfor_.participants) {
                  auctionInfor_.participants[len - 1].status = "Đang chờ thanh toán"
                  console.log(auctionInfor_)
                  updateRoom(auctionInfor_);
              }
          }
        } else {
          let auctionInfor_ = auction;
          auctionInfor_.state = 'Đấu giá thất bại';
          updateRoom(auctionInfor_);
        }
      } else if (auction.state === 'Chờ duyệt' && auctions_intervals_in_seconds > 0) {
          let auctionInfor_ = auction;
          auctionInfor_.state = 'Đấu giá thất bại';
          updateRoom(auctionInfor_);
      }
    });

    allAuctions?.forEach((auction) => {
      let time_intervals = calcTime(auction.start_at ?? new Date)
      let auctions_time_limit_in_seconds = (auction.time_limit ?? 0) * 60;
      let auctions_intervals_in_seconds = calcTimeInSeconds(time_intervals.days, time_intervals.hours, time_intervals.minutes, time_intervals.seconds)
      if (auction.state === "Chờ đấu giá"){
        console.log("hiheh")
        if (auctions_intervals_in_seconds > 0 && auctions_intervals_in_seconds < auctions_time_limit_in_seconds) {
          let auctionInfor_ = auction;
          auctionInfor_.state = 'Đang đấu giá';
            updateRoom(auctionInfor_);
            
        } 
      }
    });
  }, [completedAuctions]);


  return [allAuctions, completedAuctions];
}
