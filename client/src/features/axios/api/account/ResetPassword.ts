import apiConfig from "../../../../utils/apiConfig";
import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import axios from "axios";
import { ResetPasswordPayload } from "../../../../types/PayloadInterface";

export const resetPassword = async (payload: ResetPasswordPayload): Promise<any> => {
    try {
      
      const config: AxiosRequestConfig = {
        url: `${apiConfig.resetPassword}`,
        method: "put",
        data: payload,
      };
      // console.log("123", config)
     console.log('config', config)
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