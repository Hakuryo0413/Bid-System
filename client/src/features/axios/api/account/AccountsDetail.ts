import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import get from "../../../../../../server/node_modules/get-uri/dist/ftp.d";

//************************************
// Description: Hàm liên quan lấy dữ liệu người dùng
//************************************

const api = setupAxiosInterceptors();

export const accountData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.accountId,
      method: "get",
     
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về nhân viên.");
  }
};

export const allAccounts = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.allAccounts,
      method: "get",
    };
    const response = await api(config);
    return response?.data.allAccounts;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về account.");
  }
};

export const getAccountsByRole = async (role: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.accountRole}/${role}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về account.");
  }
};

export const getAccountsByEmail = async (email: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.accountEmail}/${email}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về account.");
  }
};

export const getAccountsById = async (id: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.accountId}/${id}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về account.");
  }
};
