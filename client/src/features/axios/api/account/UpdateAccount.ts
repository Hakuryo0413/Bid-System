import { userInterface } from "../../../../types/UserInterface";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";

const api = setupAxiosInterceptors();

export const updateAccount = async(payload: userInterface,id:string): Promise<any> => {
    try{
        const config: AxiosRequestConfig = {
            url: `${apiConfig.updateAccount}/${id}`,
            method: "put",
            data: payload
        };
        const response = await api(config);
        return response.data;
    }catch(error){
        throw new Error("Gặp lỗi khi cập nhật dữ liệu");
    }
};