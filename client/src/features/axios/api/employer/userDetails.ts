import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { userInterface } from "../../../../types/UserInterface";

//************************************
// Description: Hàm liên quan lấy dữ liệu và xóa nhân viên.
//************************************

const api = setupAxiosInterceptors();

export const employerData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.getEmployer,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về nhân viên.");
  }
};

export const deleteEmployer = async (username: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.deleteEmployer}/${username}`,
      method: "delete",
    };
    await api(config);
  } catch (error) {
    throw new Error("Gặp lỗi khi xóa dữ liệu về nhân viên.");
  }
};
