import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginPayload } from "../../../types/PayloadInterface";
import { userLoginValidationSchema } from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import {
  clearToken,
  setToken,
} from "../../../features/redux/slices/account/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../../features/redux/slices/account/accountLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/axios/api/account/AccountAuthentication";
// import { employerData } from "../../../features/axios/api/account/AccountDetails";
import { userInterface } from "../../../types/UserInterface";
import { accountData, getAccountsByEmail } from "../../../features/axios/api/account/AccountsDetail";
import { set } from "lodash";

//************************************
// Description: Phần Đăng nhập tài khoản
//************************************

function ForgotPasswordForm({ setForgotPassword }: { setForgotPassword: any }) {
  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const checkAccountEmail = async (email:string) => {
    // try {
      console.log(email,"hihi");
      const data = await getAccountsByEmail(email);
      console.log(data);
      // if (data) {
      //   setCheckEmail(true);
      //   console.log("checkEmail", email)
      //   notify("Email đã được gửi", "success");
      //   return data;
      // }
    // }
    // catch (error: any) {
    //   notify(error.message, "error");
    //   return error;
    // }
  }
  useEffect(() => {
    console.log("checkEmail", email)
    
  }, [email])
  return (
    // Create check email forgotPasswordForm
    <div className="fixed z-10 inset-0 overflow-y-auto bg-dialog bg-opacity-60">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-background p-4 rounded-lg w-1/2">
          <h1 className="text-2xl font-bold text-white">Đổi mật khẩu</h1>
          <div className="mt-4">
          
            <form>
              <div>
                <label className="text-base font-light text-white" htmlFor="email">
                  Nhập email đã đăng ký vào đây
                </label>
                <input
                  id="email"
                  type="text"
                  className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 h-12 text-lg bg-buttonOrigin text-white rounded-lg hover:bg-activeButton flex justify-center items-center"
                onClick={() => checkAccountEmail(email)}
              >
                Gửi
              </button>
              <button
                className="w-full mt-4 h-12 text-lg bg-buttonOrigin text-white rounded-lg hover:bg-activeButton flex justify-center items-center"
                onClick={() => setForgotPassword(false)}
              >
                Quay lại
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.userAuth.isLoggedIn
  // );

  const [accountDetails, setAccountDetails] = useState<userInterface>();

  let token = localStorage.getItem("token");
  let name = localStorage.getItem("name");
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

  // cái này có thể để phòng trường hợp thoát ra nhưng mà chưa đăng xuất khiến token chưa bị xóa
  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
      getAccountDetails();
      setTimeout(() => {
        // if (isLoggedIn === true) {
        if (accountDetails?.role === "admin") {
          navigate("/admin/sim/list");
        } else if (accountDetails?.role === "provider") {
          navigate("/provider/home");
        } else {
          navigate("/user/home");
        }
        // }
      }, 2000);
    }
  }, [navigate]);

  // hoạt động sau khi isLoggedIn và accountDetails được cập nhật
  useEffect(() => {
    setTimeout(() => {
      if (accountDetails) {
        if (accountDetails) {
          // Chuyển hướng sau khi cả hai dữ liệu đều đã được đọc xong
          if (accountDetails?.role === "admin") {
            navigate("/admin/sim/list");
          } else if (accountDetails?.role === "provider") {
            navigate("/provider/home");
          } else {
            navigate("/user/home");
            //  navigate("/test/testdb");
          }
        }
      }
    }, 2000);
  }, [accountDetails]);

  // họat động khi isLoggedIn được cập nhật
  // useEffect(() => {
  //   console.log(isLoggedIn)
  //   if (isLoggedIn) {
  //     // Fetch và cập nhật employerDetails
  //     const fetchAccountDetails = async () => {
  //       try {
  //         const data = await accountData();
  //         setAccountDetails(data);
  //       } catch (error: any) {
  //         notify(error.message, "error");
  //       }
  //     };
  //     fetchAccountDetails();
  //   }
  // }, [isLoggedIn]);

  const submitHandler = async (formData: LoginPayload) => {
    login(formData)
      .then((response) => {
        const token = response.token;
        localStorage.setItem("username", formData.username);

        dispatch(setToken(token));
        dispatch(loginSuccess());
        notify("Đăng nhập thành công", "success");
        setTimeout(() => {
          if (true) {
            // Gọi employerDetails() để cập nhật dữ liệu
            getAccountDetails();
          }
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  const handleForgotPassword = () => {
    setForgotPassword(true);
    console.log("onclick", forgotPassword)
  }

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
          <div>
            <div >
              <span className="text-white">Bạn chưa có tài khoản?</span>
              <a href="/signup" className="mx-2 text-signupText hover:underline">
                Đăng ký
              </a>
            </div>

          </div>
        </form>
        <div className="mt-4">
          <span className="text-white">Còn bạn quên mật khẩu rồi thì ấn </span>
          <button
            className="text-button-class text-red-600"
            onClick={() => handleForgotPassword()}
          > vào đây</button>

        </div>
        {forgotPassword && <ForgotPasswordForm setForgotPassword={setForgotPassword} />}
      </div>
      <ToastContainer />
    </div>
  );
}
