import { useState, useEffect } from "react";
import "../../assets/css/HistoryAuctionPage.css";
import HistoryAunctionCard from "../../components/auction/HistoryAuctionCard";
import UserHomePage from "../user/UserHomePage";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux/es/exports";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import { loginSuccess } from "../../features/redux/slices/account/accountLoginAuthSlice";
import { userInterface } from "../../types/UserInterface";
import { getHistoryByAccount } from "../../features/axios/api/history/HistoryDetails";
// import { accountData } from "../../../features/axios/api/account/AccountsDetail";
// import { loginSuccess } from "../../../features/redux/slices/account/accountLoginAuthSlice";
// import { userInterface } from "../../../types/UserInterface";
// import { employerData } from "../../../features/axios/api/account/AccountDetails";
import { HistoryInterface } from "../../types/HistoryInterface";
const HistoryAuction = () => {
  const dispatch = useDispatch();
  const [historyAuctions, setHistoryAuctions] = useState<[HistoryInterface] | []>([]);
  const [accountDetails, setAccountDetails] = useState<userInterface | null>(
    null
  ); // Đảm bảo setAccountDetails có thể nhận giá trị null

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess());
      fetchData();
    }
  }, [dispatch]); // useEffect sẽ được gọi lại mỗi khi dispatch thay đổi

  const getAccountDetails = async () => {
    try {
      const data = await accountData();
      setAccountDetails(data);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
    }
  };

  const fetchData = async () => {
    await getAccountDetails();
    if (accountDetails) {
      try {
        const hisData = await getHistoryByAccount(accountDetails.email);
        setHistoryAuctions(hisData);
      } catch (error) {
        console.error("Lỗi xảy ra khi thiết lập lịch sử đấu giá:", error);
      }
    }
  };
  const [HisSate, setHisSate] = useState('');
  useEffect(() => {
    setHisSate('chưa thanh toán');
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  console.log(historyAuctions);
  console.log(accountDetails);

  return (
    <>
      <h1 className="title"> Lịch sử đấu giá: </h1>
      {/* <div className="container nav">
                <a href="">Thông tin tài khoản</a>
                <a href="">Giỏ hàng</a>
                <a href="">Sim chờ</a>
                <a href="">Lịch sử đấu giá</a>
                <a href="">Tài liệu của tôi</a>
            </div> */}

      <UserHomePage />

      <div className="container content" style={{ display: "flex" }}>
        <button className="nav" style={{ flex: 1 }} onClick={()=>setHisSate('chưa thanh toán')}>
          Chưa thanh toán
        </button>
        <button className="nav" style={{ flex: 1 }} onClick={()=>setHisSate('đã thanh toán')}>
          Đã thanh toán
        </button>
        <button className="nav" style={{ flex: 1 }} onClick={()=>setHisSate('đã hoàn tiền')}>
          Đã hoàn tiền
        </button>
      </div>
            {console.log(HisSate)}
      <div className="container content">
        <table className="custom-table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">SIM</th>
              <th scope="col">ROOM</th>
              <th scope="col">CREATE AT</th>
              <th scope="col">#</th>
            </tr>
          </thead>

          {historyAuctions?.length > 0 ? (
            <tbody>
              {historyAuctions.filter((historyAuction) => {return historyAuction.state?.toLowerCase() === HisSate?.toLowerCase()}).map((historyAuction) => (
                <HistoryAunctionCard historyAuction={historyAuction} cardState={HisSate}/>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <th scope="row">nothing</th>
                <td>nothing</td>
                <td>nothing</td>
                <td>
                  <a className="button Bpay" href="/user/payment/123/1234213">
                    Thanh toán
                  </a>
                  <a className="button BDpay" href="/user/cancel/123/1234213">
                    Hủy thanh toán
                  </a>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default HistoryAuction;