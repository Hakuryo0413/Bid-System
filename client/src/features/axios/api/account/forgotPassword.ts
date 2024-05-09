import apiConfig from "../../../../utils/apiConfig";
import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import axios from "axios";
import { ForgotPasswordPayload } from "../../../../types/PayloadInterface";

export const forgot_password = async (payload: ForgotPasswordPayload): Promise<any> => {
    try {
      
      const config: AxiosRequestConfig = {
        url: `${apiConfig.forgotPassword}`,
        method: "put",
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