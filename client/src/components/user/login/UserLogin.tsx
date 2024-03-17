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
  }

  // cái này có thể để phòng trường hợp thoát ra nhưng mà chưa đăng xuất khiến token chưa bị xóa
  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
      getEmployerDetails();
      setTimeout(() => {
        if (isLoggedIn === true) {
          if (employerDetails?.role === "Giám đốc") {
            navigate("/director/statistics-points");
          } else if (employerDetails?.role === "Trưởng điểm tập kết" || employerDetails?.role === "Trưởng điểm giao dịch") {
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
          } else if (employerDetails?.role === "Trưởng điểm tập kết" || employerDetails?.role === "Trưởng điểm giao dịch") {
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
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex justify-center items-center">
        <div className="lg:block hidden">
          <img
            src="https://i.imgur.com/5KtEikT.png"
            alt="Img"
            className="max-w-450 max-h-450 w-4/5"
          />
          <img
            src="https://i.imgur.com/7XTdnaF.png"
            alt="Img"
            className="mt-[-180px] max-w-450 max-h-450 w-1/5"
          />
        </div>

      </div>
      <div className="flex flex-wrap justify-center items-center ">
        <div className="w-screen h-screen md:w-96 md:h-auto p-8 bg-white border border-gray-300 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text  "
                placeholder="Nhập tên đăng nhập"
                {...register("username")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500  "
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="password">
                Mật khẩu
              </label>
              <input

                type="password"
                placeholder="Nhập mật khẩu"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 "
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm  bg-activeButton text-white rounded hover:bg-buttonPurple flex justify-center items-center "
            >
              Đăng nhập
            </button>
          </form>

          <div className="flex justify-center">
            <img src="https://i.imgur.com/TSDO2cW.gif"
              alt="img"
              className="h-auto w-auto" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}