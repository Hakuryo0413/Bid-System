import { HistoryInterface } from "../../types/HistoryInterface";

const HistoryAunctionCard = ({
  historyAuction,
  cardState
}: {
  historyAuction: HistoryInterface;
  cardState: String;
}) => {
  const {_id, sim, room, created_at } = historyAuction;
  const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";

  return (
    <tr>
      <th scope="row">{sim}</th>
      <td>{room}</td>
      <td>{formattedCreatedAt}</td>
      {cardState === "chưa thanh toán" ? (
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
