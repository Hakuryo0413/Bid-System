import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginPayload } from "../../../types/PayloadInterface";
import { userLoginValidationSchema } from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/axios/api/employer/userAuthentication";
import { employerData } from "../../../features/axios/api/employer/userDetails";
import { employerInterface } from "../../../types/EmployerInterface";

//************************************
// Description: Phần Đăng nhập tài khoảng
//************************************

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(userLoginValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const getEmployerDetails = async () => {
    const data = await employerData();
    setEmployerDetails(data);
  };

  // cái này có thể để phòng trường hợp thoát ra nhưng mà chưa đăng xuất khiến token chưa bị xóa
  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
      getEmployerDetails();
      setTimeout(() => {
        if (isLoggedIn === true) {
          if (employerDetails?.role === "Giám đốc") {
            navigate("/director/statistics-points");
          } else if (
            employerDetails?.role === "Trưởng điểm tập kết" ||
            employerDetails?.role === "Trưởng điểm giao dịch"
          ) {
            navigate("/manager/employee");
          } else {
            navigate("/employer/home");
          }
        }
      }, 2000);
    }
  }, [navigate]);

  // hoạt động sau khi isLoggedIn và employerDetails được cập nhật
  useEffect(() => {
    setTimeout(() => {
      if (employerDetails) {
        if (isLoggedIn && employerDetails) {
          // Chuyển hướng sau khi cả hai dữ liệu đều đã được đọc xong
          if (employerDetails?.role === "Giám đốc") {
            navigate("/director/statistics-orders");
          } else if (
            employerDetails?.role === "Trưởng điểm tập kết" ||
            employerDetails?.role === "Trưởng điểm giao dịch"
          ) {
            navigate("/manager/employee");
          } else {
            navigate("/employer/home");
          }
        }
      }
    }, 2000);
  }, [employerDetails]);

  // họat động khi isLoggedIn được cập nhật
  useEffect(() => {
    if (isLoggedIn) {
      // Fetch và cập nhật employerDetails
      const fetchEmployerDetails = async () => {
        try {
          const data = await employerData();
          setEmployerDetails(data);
        } catch (error: any) {
          notify(error.message, "error");
        }
      };

      fetchEmployerDetails();
    }
  }, [isLoggedIn]);

  const submitHandler = async (formData: LoginPayload) => {
    login(formData)
      .then((response) => {
        const token = response.token;
        dispatch(setToken(token));
        dispatch(loginSuccess());
        notify("Đăng nhập thành công", "success");
        setTimeout(() => {
          if (isLoggedIn) {
            // Gọi employerDetails() để cập nhật dữ liệu
            getEmployerDetails();
          }
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div className="justify-center py-36 flex min-h-screen bg-background">
      <div className="w-2/5">
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <h2 className="text-5xl font-bold mb-12 text-white">Đăng nhập</h2>
          <div>
            <label className="text-lg font-light text-white" htmlFor="email">
              Số điện thoại/ CCCD/ Mã số thuế
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="text-lg font-thin text-white" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 h-12  text-lg  bg-buttonOrigin text-white rounded-lg hover:bg-activeButton flex justify-center items-center "
          >
            Đăng nhập
          </button>
          <div className="flex justify-center items-center">
            <span className="text-white">Bạn chưa có tài khoản?</span>
            <a href="/signup" className="mx-2 text-signupText hover:underline">
              Đăng ký
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
