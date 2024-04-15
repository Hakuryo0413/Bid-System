import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { SignupPayload } from "../../../types/PayloadInterface";
import { userRegisterValidationSchema } from "../../../utils/validation";
import { userInterface } from "../../../types/UserInterface";
import { createAccount } from "../../../features/axios/api/account/AccountAuthentication";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import createNewNotification from "../../../features/axios/api/notification/CreateNotification";
import {
  NotificationInterface,
  NotificationPayload,
} from "../../../types/NotificationInterface";
import { set } from "lodash";

export function CreateCaNhan() {
  const [state, setState] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const role = "provider";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupPayload>({
    resolver: yupResolver(userRegisterValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  const submitHandler = async (formData: SignupPayload) => {
    formData.role = role;
    formData.state = false;
    setEmail(formData.email);
    createAccount(formData)
      .then((response: any) => {
        notify("Your Register Form was sent", "success");
        setState(true);
        setTimeout(() => {
/*           navigate("/login");
 */        }, 6000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  useEffect(() => {
    if (state) {
      const payload: NotificationPayload = {
        account: "hihi@gmail.com",
        content: "Có một yêu cầu đăng ký mới",
        state: false,
        from: email,
      };
      createNewNotification(payload);
      console.log("payload", payload);
    }
  }, [state]);
  return (
    <div className="justify-center min-h-screen bg-background">
      <div className="flex flex-row mx-4 ">
        <IoIosArrowBack className="mt-1 text-white" />
        <a href="/signup" className="mx-4 text-white hover:text-currentText">
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
          Thông tin cơ bản
        </h2>
        <p
          className="text-center text-base text-white"
          style={{ color: "#97a3b6" }}
        >
          Nhập thông tin đăng ký hồ sơ để tham gia đấu giá
        </p>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="mt-10 grid grid-cols-1 mx-60 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                <span className="text-red-600 text-xl pr-2">*</span>
                Tên tổ chức
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="first-name"
                  {...register("name")}
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                <span className="text-red-600 text-xl pr-2">*</span>
                Email
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("email")}
                  id="first-name"
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            {/* <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                Tên người đại diện
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="first-name"
                  {...register("representerName")}
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.representerName && (
                  <p className="text-red-500 text-sm">
                    {errors.representerName.message}
                  </p>
                )}
              </div>
            </div> */}
            {/* <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                Chức vụ
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="first-name"
                  {...register("pos")}
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.pos && (
                  <p className="text-red-500 text-sm">{errors.pos.message}</p>
                )}
              </div>
            </div> */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                <span className="text-red-600 text-xl pr-2">*</span>
                Mật khẩu
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  {...register("password")}
                  id="first-name"
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                <span className="text-red-600 text-xl pr-2">*</span>
                Nhập lại mật khẩu
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("confirmPassword")}
                  id="first-name"
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                <span className="text-red-600 text-xl pr-2">*</span>
                Số điện thoại
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("phone")}
                  id="first-name"
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-white">
                <span className="text-red-600 text-xl pr-2">*</span>
                Địa chỉ
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("address")}
                  id="first-name"
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
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
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateCaNhan;
export {};
