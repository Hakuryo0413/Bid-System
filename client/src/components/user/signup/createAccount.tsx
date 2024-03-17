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

//************************************
// Description: Phần Giám đốc và các trưởng điểm tạo tài khoản mới cho nhân viên
//************************************

export function CreateAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<SignupPayload>({
    resolver: yupResolver(userRegisterValidationSchema),
  });


  const token = localStorage.getItem("token");
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();

  const getEmployerDetails = async () => {
    const data = await employerData();
    setEmployerDetails(data);
  }

  useEffect(() => {
    getEmployerDetails();
  }, []);

  useEffect(() => {
    if (employerDetails) {
      setValue("consolidation", employerDetails.consolidation ?? "");
      setValue("transaction", employerDetails.transaction ?? "");
    }
  }, [employerDetails])



  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  const submitHandler = async (formData: SignupPayload) => {
    if (employerDetails?.role === "Trưởng điểm giao dịch") {
      formData.role = "Nhân viên điểm giao dịch";
    } else if (employerDetails?.role === "Trưởng điểm tập kết") {
      formData.role = "Nhân viên điểm tập kết";
    }
    createAccount(formData)
      .then((response: any) => {
        notify("User registered successfully", "success");
        setTimeout(() => {
          if (token) {
            if (employerDetails?.role === "Trưởng điểm tập kết" || employerDetails?.role === "Trưởng điểm giao dịch") {
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
    <div className="flex justify-center min-h-screen">
      <div className="flex justify-center items-center bg-background">
        <div className="lg:block hidden ">
          <img
            src="https://i.imgur.com/5KtEikT.png"
            alt="Img"
            className="max-w-450 max-h-450 w-4/5 bg-cover bg-center"
          />
          <img
            src="https://i.imgur.com/7XTdnaF.png"
            alt="Img"
            className="mt-[-180px] max-w-450 max-h-450 w-1/5 bg-cover bg-center"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center ">
        <div className="w-[200%] h-screen md:h-auto p-8 bg-white border border-gray-300 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold ">Tạo tài khoản</h2>
          <p className="text-small text-gray-500 mb-4">Tạo tài khoản cho nhân viên</p>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Tên
              </label>
              <input
                type="text"
                placeholder="Nhập tên người dùng"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                {...register("username")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Điện thoại
              </label>
              <input
                type="phone"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Xác nhận lại mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu để xác nhận"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm bg-activeButton text-white rounded hover:bg-buttonPurple flex justify-center items-center"
            >
              Tạo tài khoản
            </button>
          </form>


        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateAccount;
export { };
