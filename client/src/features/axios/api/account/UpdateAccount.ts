import { userInterface } from "../../../../types/UserInterface";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import axios, { AxiosRequestConfig } from "axios";

const api = setupAxiosInterceptors();

export const updateAccount = async(payload: userInterface): Promise<any> => {
    try{
        const config: AxiosRequestConfig = {
            url: `${apiConfig.updateAccount}`,
            method: "put",
            data: payload
        };
        const response = await axios(config);
        return response;
      } catch (error) {
        console.log(error)
        throw new Error("Gặp lỗi khi cập nhật tài khoản.");
      }
};