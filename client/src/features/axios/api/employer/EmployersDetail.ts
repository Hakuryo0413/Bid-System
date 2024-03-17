import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";

//************************************
// Description: Hàm liên quan lấy dữ liệu người dùng
//************************************

const api = setupAxiosInterceptors();

export const allEmployersData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.allEmployers,
      method: "get",
    };
    const response = await api(config);
    return response?.data.allEmployers;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về nhân viên.");
  }
};

export const getEmployersByCons = async (consolidation: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.employerCons}/${consolidation}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về nhân viên.");
  }
};

export const getEmployersByTrans = async (transaction: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.employerTrans}/${transaction}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về nhân viên.");
  }
};