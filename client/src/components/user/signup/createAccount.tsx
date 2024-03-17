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

  // useEffect(() => {
  //   getEmployerDetails();
  // }, []);

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
    <div className="justify-center min-h-screen bg-background">
      <h2 className="text-4xl font-bold mb-12 text-white">Bạn là cá nhân hay tổ chức ?</h2>
      <p className="text-white" style = {{color: "#97a3b6"}}>Vui lòng chọn loại hình bạn muốn đăng ký tài khoản</p>
      <ToastContainer />
    </div>
  );
}

export default CreateAccount;
export { };
