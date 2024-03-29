import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { SignupPayload } from "../../../types/PayloadInterface";
import { userRegisterValidationSchema } from "../../../utils/validation";
import { userInterface } from "../../../types/UserInterface";
import { employerData } from "../../../features/axios/api/account/accountDetails";
import { createAccount } from "../../../features/axios/api/account/AccountAuthentication";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export function CreateCaNhan() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(userRegisterValidationSchema),
  });

  const token = localStorage.getItem("token");
  const [userDetails, setUserDetails] = useState<userInterface>();

  // const getUserDetails = async () => {
  //   const data = await userData();
  //   setUserDetails(data);
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  useEffect(() => {
    if (userDetails) {
    }
  }, [userDetails]);

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  const submitHandler = async (formData: SignupPayload) => {
    if (userDetails?.role === "Cá nhân") {
      formData.role = "Cá nhân";
    } else if (userDetails?.role === "Tổ chức") {
      formData.role = "Tổ chức";
    }
    createAccount(formData)
      .then((response: any) => {
        notify("User registered successfully", "success");
        setTimeout(() => {
          if (token) {
            if (
              userDetails?.role === "Cá nhân" ||
              userDetails?.role === "Tổ chức"
            ) {
              navigate("/manager/employee");
            } else {
              navigate("/employer/login");
            }
          }
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
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
                Họ và tên
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
                {" "}
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
                  {...register("username")}
                  id="first-name"
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
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
export { };
