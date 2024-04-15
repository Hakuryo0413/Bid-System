import { HistoryInterface } from "../../types/HistoryInterface";

const HistoryAunctionCard = ({
  historyAuction,
}: {
  historyAuction: HistoryInterface;
}) => {
  const { sim, room, created_at } = historyAuction;
  const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";

  return (
    <tr>
      <th scope="row">{sim}</th>
      <td>{room}</td>
      <td>{formattedCreatedAt}</td>
      <td>
        <a className="button Bpay" href="/user/payment/1234213">
          Thanh toán
        </a>
        <a className="button BDpay" href="/user/cancel/1234213">
          Hủy thanh toán
        </a>
      </td>
    </tr>
  );
};

export default HistoryAunctionCard;
