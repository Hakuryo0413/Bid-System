import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { SignupPayload } from "../../../types/PayloadInterface";
import { userRegisterValidationSchema } from "../../../utils/validation";
import { employerInterface } from "../../../types/EmployerInterface";
import { employerData } from "../../../features/axios/api/employer/userDetails";
import { createAccount } from "../../../features/axios/api/employer/userAuthentication";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export function CreateCaNhan() {
  const navigate = useNavigate();
  const handleHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const img = event.currentTarget.querySelector("img");
    if (img) {
      (img as HTMLImageElement).style.transform = "scale(1.1)";
    }
  };
  const handleLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const img = event.currentTarget.querySelector("img");
    if (img) {
      (img as HTMLImageElement).style.transform = "scale(1)";
    }
  };

  return (
    <div className="justify-center min-h-screen bg-background">
      <div className="flex flex-row mx-4 ">
        <IoIosArrowBack className="mt-1 text-white" />
        <a href="/signup" className="mx-4 text-white hover:text-currentText">
          Quay trở lại
        </a>
      </div>
      <div className="justify-center py-12  min-h-screen">
        <h2 className="text-center	 text-5xl font-thin mb-4 text-white">VPA</h2>
        <h2 className="text-center	 text-5xl font-bold mb-4 text-white">
          Thông tin cơ bản
        </h2>
        <p
          className="text-center text-base text-white"
          style={{ color: "#97a3b6" }}
        >
          Nhập thông tin đăng ký hồ sơ để tham gia đấu giá
        </p>
        <div className="mt-10 grid grid-cols-1 mx-60 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-white">
              Họ và tên
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-white">
              Mật khẩu
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-white">
              Nhập lại mật khẩu
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-white">
              Số điện thoại
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-white">
              Mã OTP
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <button
              type="submit"
              className="w-full px-3 py-2 h-12  text-lg  bg-buttonOrigin text-white rounded-3xl hover:bg-activeButton flex justify-center items-center  "
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateCaNhan;
export {};
