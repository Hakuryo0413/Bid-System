import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { userInterface } from "../../types/UserInterface";
import {
  getAccountsByEmail,
  getAccountsById,
} from "../../features/axios/api/account/AccountsDetail";
import DeleteConfirm from "./DeleteConfim";
import { SignupPayload } from "../../types/PayloadInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { userRegisterValidationSchema } from "../../utils/validation";
import { createAccount } from "../../features/axios/api/account/AccountAuthentication";

interface CreateUserWindowProps {
  role: string;
  onClose: () => void;
  onCloseButt: () => void;
}

const CreateUserWindow: React.FC<CreateUserWindowProps> = ({
  role: role,
  onClose,
  onCloseButt,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupPayload>({
    resolver: yupResolver(userRegisterValidationSchema),
  });
  const navigate = useNavigate();

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  const submitHandler = async (formData: SignupPayload) => {
    formData.role = role;
    formData.state = true;

    createAccount(formData)
      .then((response: any) => {
        notify("New account created", "success");

        onClose();
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div>
      <div className="fixed inset-0  flex items-center justify-center bg-white bg-opacity-20 w-full h-screen z-50">
        <div className="bg-white rounded-lg md:w-[400px] w-[90%]">
          <div className="relative bg-background rounded-t-lg flex w-full items-center">
            <div className=" font-bold text-lg p-2 w-full text-center">
              {role === "user" && <p>Tài khoản cá nhân</p>}
              {role === "provider" && <p>Tài khoản nhà cung cấp</p>}
            </div>
            <div className="absolute top-0 right-0 flex justify-end bg-background hover:bg-red-300 p-2 rounded-tr-lg">
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                className="cursor-pointer text-white px-2"
                onClick={onCloseButt}
              />
            </div>
          </div>

          <div className="text-background min-h-[100px] w-auto mx-8 my-4 md:text-[18px] text-small">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="text-left mb-8 text-sm"
            >
              <div className="mb-2">
                {role === "user" && <p className="font-bold">Họ và tên</p>}
                {role === "provider" && (
                  <p className="font-bold">Tên tổ chức</p>
                )}
                <div className="mt-2">
                  <input
                    type="text"
                    id="first-name"
                    {...register("name")}
                    className="w-full mt-2 h-12 px-4 border  text-black border-gray-800 rounded-lg focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <p className="font-bold">Email</p>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("email")}
                    id="first-name"
                    className="w-full mt-2 h-12 px-4 border  text-black border-gray-800 rounded-lg focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <p className="font-bold">Số điện thoại</p>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("phone")}
                    id="first-name"
                    className="w-full mt-2 h-12 px-4 border  text-black border-gray-800 rounded-lg focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <p className="font-bold">Mật khẩu</p>
                <div className="mt-2">
                  <input
                    type="password"
                    {...register("password")}
                    id="first-name"
                    className="w-full mt-2 h-12 px-4 border  text-black border-gray-800 rounded-lg focus:outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <p className="font-bold"> Nhập lại mật khẩu</p>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("confirmPassword")}
                    id="first-name"
                    className="w-full mt-2 h-12 px-4 border text-black border-gray-800 rounded-lg focus:outline-none"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <p className="font-bold">Địa chỉ</p>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("address")}
                    id="first-name"
                    className="w-full mt-2 h-12 px-4 border  text-black border-gray-800 rounded-lg focus:outline-none"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  className="font-bold bg-green-500 text-white px-8 py-2 rounded-lg w-[48%] relative before:ease overflow-hidden shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40"
                  type="submit"
                >
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateUserWindow;
