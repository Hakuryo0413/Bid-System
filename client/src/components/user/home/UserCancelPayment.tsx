import React from "react";

function UserCancelPayment() {
  return (
    <div className="border border-border rounded-2xl text-white  ">
      <form>
        <h2 className="text-4xl py-8 text-center"> Huỷ thanh toán </h2>
        <div className="px-8 text-base ">
          <p >1. Thông tin sim:</p>
          <div className="mt-4 grid  grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block  font-medium leading-6 text-white">
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
        <div className="border-t border-border mt-8 mx-8"></div>
        <div className="px-8 py-8 text-base">
          <p>2. Huỷ thanh toán:</p>
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
          <div className="mt-4 grid grid-cols-1 justify-center  gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <label className="block text-base mb-2  font-medium  leading-6 text-white">
                Lý do huỷ thanh toán:
              </label>
              <select
                id="reason"
                className="w-full px-2 py-2 my-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-inset"
                required
                placeholder="Lý do"
              >
                <option value="Chọn lý do">Chọn lý do</option>

                <option value="Thủ tục thanh toán rắc rối">
                  Thủ tục thanh toán rắc rối
                </option>
                <option value="Tôi tìm thấy chỗ mua khác tốt hơn (Rẻ hơn, uy tín hơn...)">
                  Tôi tìm thấy chỗ mua khác tốt hơn (Rẻ hơn, uy tín hơn...)
                </option>

                <option value="Tôi tìm thấy sản phẩm khác phù hợp hơn ">
                  Tôi tìm thấy sản phẩm khác phù hợp hơn
                </option>

                <option value="Lý do cá nhân">Lý do cá nhân</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-20 pb-12">
          <button className=" border-border w-32 border-2  text-white hover:bg-green-500  mx-4 px-4 py-2 rounded-lg">
            Huỷ
          </button>
          <button
            type="submit"
            className="hover:bg-green-500 border-2 border-border text-white px-4 w-32 py-2 mx-4 rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserCancelPayment;
