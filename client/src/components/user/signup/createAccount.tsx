import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { SignupPayload } from "../../../types/PayloadInterface";
import { userRegisterValidationSchema } from "../../../utils/validation";
import { userInterface } from "../../../types/UserInterface";
import { employerData } from "../../../features/axios/api/employer/userDetails";
import { createAccount } from "../../../features/axios/api/employer/userAuthentication";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export function CreateAccount() {
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
        <a href="/" className="mx-4 text-white hover:text-currentText">
          Quay trở lại
        </a>
      </div>
      <div className="justify-center py-12  min-h-screen">
        <div className="flex justify-center">
          <img
            src={require("../../../assets/images/logo.png")}
            className="object-cover  h-20 rounded-3xl"
          />
          <h2 className="text-center mt-5 mx-2	 text-5xl font-thin mb-4 text-white">
            DGS
          </h2>
        </div>
        <h2 className="text-center	 text-5xl font-bold mb-4 text-white">
          Bạn là cá nhân hay tổ chức ?
        </h2>
        <p
          className="text-center text-base text-white"
          style={{ color: "#97a3b6" }}
        >
          Vui lòng chọn loại hình bạn muốn đăng ký tài khoản
        </p>
        <div className="flex justify-center m-12">
          <div className="bg-card h-96 w-72 rounded-3xl mr-6">
            <Link
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              to={"canhan"}
            >
              {/* Use Link for navigation */}
              <div className="flex">
                <h2 className="text-2xl   mx-4 mt-2 text-white">Cá nhân</h2>
                <IoIosArrowForward className=" ml-36 mt-4  text-white" />
              </div>
              <img
                src={require("../../../assets/images/canhan.jpeg")}
                className="object-cover mt-6 h-80 rounded-3xl"
              />
            </Link>
          </div>
          <div className="bg-card h-96 w-72 rounded-3xl ml-6">
            <Link
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              to={"tochuc"}
            >
              {/* Use Link for navigation */}
              <div className="flex">
                <h2 className="text-2xl   mx-4 mt-2 text-white">Tổ chức</h2>
                <IoIosArrowForward className=" ml-36 mt-4  text-white" />
              </div>
              <img
                src={require("../../../assets/images/tochuc.jpeg")}
                className="object-cover mt-6 h-80 rounded-3xl"
              />
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateAccount;
export {};
