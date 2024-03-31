import { useState, useEffect } from "react";
import '../../assets/css/HistoryAuctionPage.css';
import HistoryAunctionCard from "../../components/auction/HistoryAuctionCard";

const HistoryAuction = () => {

    const [historyAutions, setHistoryAutions] = useState([])

    return (
        <>
            <h1 className="title"> Lịch sử đấu giá: </h1>
            <div className="container nav">
                <a href="">Thông tin tài khoản</a>
                <a href="">Giỏ hàng</a>
                <a href="">Sim chờ</a>
                <a href="">Lịch sử đấu giá</a>
                <a href="">Tài liệu của tôi</a>
            </div>

            <div className="container content" style={{ display: 'flex' }}>

                <button className="nav" style={{ flex: 1 }}>Chưa thanh toán</button>
                <button className="nav" style={{ flex: 1 }}>Đã thanh toán</button>
                <button className="nav" style={{ flex: 1 }}>Đã hoàn tiền</button>

            </div>

            <div className="container content">

                <table className="custom-table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Số tiền</th>
                            <th scope="col">Thời gian đấu giá</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>

                    {
                        historyAutions?.length > 0
                            ?
                            (
                                <tbody>
                                    {historyAutions.map((historyAuction) => (
                                        <HistoryAunctionCard historyAution={historyAuction} />
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <th scope="row">nothing</th>
                                        <td>nothing</td>
                                        <td>nothing</td>
                                        <td>nothing</td>
                                        <td>
                                            <a className="button Bpay">Thanh toán</a>
                                            <a className="button BDpay">Hủy thanh toán</a>
                                        </td>
                                    </tr>
                                </tbody>

                            )
                    }

                </table>
            </div>
        </>
    );
}

export default HistoryAuction;