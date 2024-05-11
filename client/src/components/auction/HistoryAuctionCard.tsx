import { HistoryInterface } from "../../types/HistoryInterface";

const HistoryAunctionCard = ({
  historyAuction,
  cardState
}: {
  historyAuction: HistoryInterface;
  cardState: String;
}) => {
  const {_id, sim, room, created_at,state} = historyAuction;
  //const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";

  const formatCreatedAt = (dateString: string) => {
    //const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
    // return new Date(dateString).toLocaleDateString('en-US', options);
  };
  // const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";
  const formattedCreatedAt = created_at ? formatCreatedAt(created_at.toLocaleString()) : "";
  
  // console.log("hisAuctionCard", cardState);
  return (
    <tr>
      <th scope="row">{sim}</th>
      <td>{room}</td>
      <td>{formattedCreatedAt}</td>
      {cardState.toLocaleLowerCase() === "chưa thanh toán" ? (
        <td>
          <a className="button Bpay" href={`/user/payment/${room}/${sim}/${_id}`}>
            Thanh toán
          </a>
          <a className="button BDpay" href={`/user/cancel/${room}/${sim}/${_id}`}>
            Hủy thanh toán
          </a>
        </td>
      ) : state?.toLocaleLowerCase() === "chưa thanh toán" ? (
        <td>
          <a className="button Bpay" href={`/user/payment/${room}/${sim}/${_id}`}>
            Thanh toán
          </a>
          <a className="button BDpay" href={`/user/cancel/${room}/${sim}/${_id}`}>
            Hủy thanh toán
          </a>
        </td>
      ) : (
        <td>{cardState}</td>
      )}
    </tr>
  );
};

export default HistoryAunctionCard;
