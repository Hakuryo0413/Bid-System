import {HistoryInterface} from "../../types/HistoryInterface"

const HistoryAunctionCard = ({ historyAuction }: {historyAuction: HistoryInterface}) => {
    const {sim, room, created_at} = historyAuction;
    const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";

    return (
        
        <tr>
            <th scope="row">{sim}</th>
            <td>{room}</td>
            <td>{formattedCreatedAt}</td>
            <td>
                <a className="button Bpay" href="/user/payment/{id1}">Thanh toán</a>
                <a className="button BDpay"  href="/user/cancel">Hủy thanh toán</a>
            </td>
        </tr>
    );
}

export default HistoryAunctionCard;