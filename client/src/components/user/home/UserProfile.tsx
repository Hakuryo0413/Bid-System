import React from "react";

import { Route, Routes } from "react-router-dom";
// import file css
function ChangePassword({ setIsChangePassword }: { setIsChangePassword: (value: boolean) => void }) {
  return (
    // Create dialog to change password that place in the middle of the window and the background is blur
    // make background blur
    <div className="fixed z-10 inset-0 overflow-y-auto bg-dialog bg-opacity-60">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-background p-4 rounded-lg w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Đổi mật khẩu</h2>
            <button className="text-white" onClick={() => setIsChangePassword(false)}>X</button>
          </div>
          <form className="mt-6">
            <div className="flex flex-col mb-8">
              {/* <label className="text-white" htmlFor="old-password">Mật khẩu cũ</label> */}
              <input
                className="h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none hover:border-green-700"
                type="password"
                id="old-password"
                placeholder="Nhập mật khẩu cũ"
              />
            </div>
            <div className="flex flex-col mb-8">
              {/* <label className="text-white" htmlFor="new-password">Mật khẩu mới</label> */}
              <input
                className="h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none hover:border-green-700"
                type="password"
                id="new-password"
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div className="flex flex-col mb-8">
              {/* <label className="text-white" htmlFor="confirm-password">Xác nhận mật khẩu</label> */}
              <input
                className="h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none hover:border-green-700"
                type="password"
                id="confirm-password"
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
            {/* password rule */}
            <div className="bg-note  justify-start mb-4 rounded-lg">
              <p className="text-white text-sm p-4 font-semibold">
                Lưu ý khi thay đổi mật khẩu:
              </p>
              <div className="ml-9 pb-4">

                <ul className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500">
                  <li>Mật khẩu phải chứa ít nhất 8 ký tự</li>
                  <li>Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa</li>
                  <li>Mật khẩu phải chứa ít nhất 1 chữ cái viết thường</li>
                  <li>Mật khẩu phải chứa ít nhất 1 số</li>
                </ul>

              </div>
            </div>


            <div className="flex justify-center mb-3">
              <button
                className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Đổi mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}


function UserProfile() {
  // change show dialog 

  const [isChangePassword, setIsChangePassword] = React.useState(false);
  return (
    // create form for user profile bao gồm Thông tin cá nhân và Thông tin ngân hàng
    <div>
      <div className="w-full flex flex-col sm:flex-col md:flex-row items-start justify-between max-h-fit profile-top-title-wrap pt-10">

        <h2 className=" py-1 md:text-3xl lg:text-[40px] font-bold drop-shadow-2xl mb-3 text-white"> Thông tin cá nhân </h2>
        {/* button with text */}
        {/* svg lock button  */}
        <button className="border border-border rounded-2xl flex items-center text-white font-bold py-2 px-4 rounded-lgn  hover:backdrop-brightness-200 " onClick={() => setIsChangePassword(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3.33203" y="5.83203" width="13.3333" height="11.6667" rx="4" stroke="#94A3B8" stroke-width="1.5" />
            <ellipse cx="9.9987" cy="11.6667" rx="1.66667" ry="1.66667" stroke="#94A3B8" stroke-width="1.5" />
            <path d="M13.3346 5.83333C13.3346 3.99238 11.8423 2.5 10.0013 2.5C8.16035 2.5 6.66797 3.99238 6.66797 5.83333" stroke="#94A3B8" stroke-width="1.5" />
          </svg>
          <span
            className="ml-2">

            Thay đổi mật khẩu
          </span>
        </button>

      </div>
      <div className="h-6">
      </div>
      <div className="border border-border rounded-2xl text-white">
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
      {isChangePassword && <ChangePassword setIsChangePassword={setIsChangePassword} />}
      {/* button ghi nhận */}
      <div className="flex justify-center mt-2">
        <button className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
          Cập nhật thông tin
        </button>
      </div>
    </div>

  )
}

export default UserProfile;