import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginPayload } from "../../../types/PayloadInterface";
import { userLoginValidationSchema } from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../features/redux/slices/account/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../../features/redux/slices/account/accountLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/axios/api/account/AccountAuthentication";
// import { employerData } from "../../../features/axios/api/account/AccountDetails";
import { userInterface } from "../../../types/UserInterface";
import { accountData } from "../../../features/axios/api/account/AccountsDetail";

//************************************
// Description: Phần Đăng nhập tài khoản
//************************************

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );

  const [accountDetails, setAccountDetails] = useState<userInterface>();

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

  const getAccountDetails = async () => {
    const data = await accountData();
    setAccountDetails(data);
  };

  let token = localStorage.getItem("token");

  // cái này có thể để phòng trường hợp thoát ra nhưng mà chưa đăng xuất khiến token chưa bị xóa
  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
      getAccountDetails();
      setTimeout(() => {
        if (isLoggedIn === true) {
          if (accountDetails?.role === "admin") {
            navigate("/admin/home");
          } else if (accountDetails?.role === "provider") {
            navigate("/provider/home");
          } else {
            navigate("/user/home");
          }
        }
      }, 2000);
    }
  }, [navigate]);

  // hoạt động sau khi isLoggedIn và accountDetails được cập nhật
  useEffect(() => {
    setTimeout(() => {
      if (accountDetails) {
        if (isLoggedIn && accountDetails) {
          // Chuyển hướng sau khi cả hai dữ liệu đều đã được đọc xong
          if (accountDetails?.role === "admin") {
            navigate("/admin/providerList");
          } else if (accountDetails?.role === "provider") {
            navigate("/user/home");
          } else {
            navigate("/user/home");
          }
        }
      }
    }, 2000);
  }, [accountDetails]);
  // họat động khi isLoggedIn được cập nhật
  useEffect(() => {
    if (isLoggedIn) {
      // Fetch và cập nhật employerDetails
      const fetchAccountDetails = async () => {
        try {
          const data = await accountData();
          setAccountDetails(data);
        } catch (error: any) {
          notify(error.message, "error");
        }
      };
      fetchAccountDetails();
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
            getAccountDetails();
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
              Số điện thoại / CCCD
            </label>
            <input
              id="email"
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
            className="w-full   mt-20  h-12  text-lg  bg-buttonOrigin text-white rounded-lg hover:bg-activeButton flex justify-center items-center "
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
