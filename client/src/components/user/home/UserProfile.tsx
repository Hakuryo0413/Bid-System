import React from "react";

import { Route, Routes } from "react-router-dom";
// import file css


function UserProfile() {
  return (
    // create form for user profile bao gồm Thông tin cá nhân và Thông tin ngân hàng
    <div>
      <h2 className="w-full py-1 md:text-3xl lg:text-[40px] font-bold drop-shadow-2xl mb-3 text-white"> Thông tin cá nhân </h2>
      <div className="border border-border rounded-2xl text-white  ">
        <form>
          {/* add space */}

          <div className="px-8 text-base pt-6">
            <p>1. Thông tin cá nhân:</p>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block font-medium leading-6 text-white">
                  Họ và tên:
                  <span className="ml-2"></span>
                  <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" />

                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Số điện thoại:
                  <span className="ml-2"></span>
                  <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" />
                </label>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Email:
                  <span className="ml-2"></span>
                  <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Căn cước công dân:
                  <span className="ml-2"></span>
                  <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" />
                </label>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8  mx-8"></div>
          <div className="px-8 py-8 text-base">
            <p>2. Địa chỉ cư trú:</p>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white ">
                  Chọn tỉnh/thành phố:
                  <span className="ml-2"></span>
                  {/* <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" /> */}
                  {/* select option */}
                  <select className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none">
                    <option value="0">Hà Nội</option>
                    <option value="1">Hồ Chí Minh</option>
                    <option value="2">Đà Nẵng</option>
                    <option value="3">Hải Phòng</option>
                    <option value="4">Cần Thơ</option>
                  </select>
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Chọn quận/ huyện:
                  <span className="ml-2"></span>
                  {/* <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" /> */}
                  <select className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none">
                    <option value="0">Ba Đình</option>
                    <option value="1">Hoàn Kiếm</option>
                    <option value="2">Hai Bà Trưng</option>
                    <option value="3">Đống Đa</option>
                    <option value="4">Cầu Giấy</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Chọn  phường/ xã:
                  <span className="ml-2"></span>
                  {/* <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" /> */}
                  <select className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none">
                    <option value="0">Phúc Xá</option>
                    <option value="1">Trúc Bạch</option>
                    <option value="2">Vĩnh Phúc</option>
                    <option value="3">Cống Vị</option>
                    <option value="4">Liễu Giai</option>
                  </select>
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Địa chỉ trên CCCD:
                  <span className="ml-2"></span>
                  <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" />
                </label>
              </div>
            </div>
          </div>
          <div className="px-8 py-8 text-base">
            <p>3. Thông tin ngân hàng:</p>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white ">
                  Số tài khoản:
                  <span className="ml-2"></span>
                  <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" />

                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block  font-medium leading-6 text-white">
                  Chủ tài khoản:
                  <span className="ml-2"></span>
                  <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" />

                </label>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
              
              <div className="sm:col-span-4">
                <label className="block  font-medium leading-6 text-white">
                  Chọn ngân hàng:
                  <span className="ml-2"></span>
                  {/* <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" /> */}
                  <select className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none">
                    <option value="0">Ngân hàng Nông nghiệp và Phát triển nông thôn Việt Nam</option>
                    <option value="1">Ngân hàng Công thương Việt Nam</option>
                    <option value="2">Ngân hàng TMCP Ngoại thương Việt Nam</option>
                    <option value="3">Ngân hàng TMCP Quân đội</option>
                    <option value="4">Ngân hàng TMCP Sài Gòn Thương Tín</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default UserProfile;
