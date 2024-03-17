import axios, { AxiosRequestConfig } from "axios";
import {
  LoginPayload,
  SignupPayload,
} from "../../../../types/PayloadInterface";
import apiConfig from "../../../../utils/apiConfig";

//************************************
// Description: Hàm liên quan tạo tài khoản, đăng nhập của người dùng.
//************************************

export const createAccount = async (payload: SignupPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.createAccount}`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Yêu cầu không thành công với mã trạng thái 409") {
      throw new Error("Tên tài khoản đã tồn tại !!!");
    } else {
      console.log(error.message);
      throw new Error("Tạo tài khoản thất bại, hãy thử lại.");

    }
  }
};

export const login = async (payload: LoginPayload): Promise<any> => {
  try {
    
    const config: AxiosRequestConfig = {
      url: `${apiConfig.login}`,
      method: "post",
      data: payload,
    };
    // console.log("123", config)
   
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Yêu cầu không thành công với mã trạng thái 401.") {
      throw new Error("Đăng nhập thất bại, hãy thử lại.");
    } else {
      throw new Error("Tên đăng nhập hoặc mật khẩu không đúng !!!");
    }
  }
};

