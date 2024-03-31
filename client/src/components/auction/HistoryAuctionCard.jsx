const HistoryAunctionCard = ({ historyAution }) => {
    return (
        <tr>
            <th scope="row">VT01</th>
            <td>0123456789</td>
            <td>500000</td>
            <td>10:am</td>
            <td>
                <a className="button Bpay">Thanh toán</a>
                <a className="button BDpay">Hủy thanh toán</a>
            </td>
        </tr>
    );
}

export default HistoryAunctionCard;