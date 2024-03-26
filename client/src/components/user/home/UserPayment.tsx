import { Checkbox } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserPayment() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border border-border rounded-2xl text-white  ">
        <form>
          <h2 className="text-4xl py-8 text-center"> Thanh toán </h2>
          <div className="px-8 text-base">
            <p>1. Thông tin sim:</p>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block font-medium leading-6 text-white">
                  Số điện thoại:
                  <span className="ml-2"></span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Nhà phân phối:
                  <span className="ml-2"></span>
                </label>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Phiên đấu giá:
                  <span className="ml-2"></span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Giá tiền:
                  <span className="ml-2"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8  mx-8"></div>

          <div className="px-8 py-8 text-base">
            <p>2. Thanh toán:</p>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white ">
                  Người mua:
                  <span className="ml-2"></span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Số CCCD:
                  <span className="ml-2"></span>
                </label>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block font-medium leading-6 text-white">
                  Phiên đấu giá:
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Giá tiền
                </label>
              </div>
            </div>
          </div>
          <div className="border-t border-border mb-8 mx-8"></div>

          <div className="px-8 grid grid-cols-1  text-base sm:grid-cols-4 ">
            <div className="items-center mb-4  sm:col-span-2 ">
              <p>Phương thức thanh toán</p>
              <div className="bg-white items-center flex mt-4 h-20 rounded-lg border-gray border-2   ">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 mx-4  text-green-600 bg-gray-100 border-green-900 focus:ring-green-500 dark:focus:ring-green-600  focus:ring-2"
                />
                <div className="mx-2">
                  <label className="text-lg  text-black dark:text-gray-300">
                    VNPAY
                  </label>
                  <p className="text-gray-500  text-sm font-light">
                    Trả online nhiều ưu đãi
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4 px-8">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm   dark:text-gray-300">
              Tôi đã đọc và đồng ý với các
              <a href="/" className="mx-1 text-green-300 hover:underline">
                điều khoản và điều kiện
              </a>
            </label>
          </div>
          <div className=" grid grid-cols-3  pt-4 pb-8 place-items-end ">
            <div className="col-span-2"></div>
            <div className="col-span-1">
              <button className=" border-border w-32 border-2  text-white hover:bg-red-500   px-2 py-2 rounded-lg">
                Huỷ
              </button>
              <button
                onClick={() => {
                  navigate("/user/payment/QRCode");
                }}
                className="hover:bg-green-500 border-2 border-border text-white px-2 w-32 py-2 mx-4 rounded-lg"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserPayment;
