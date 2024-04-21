import { HistoryInterface } from "../../../../types/HistoryInterface";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";

const api = setupAxiosInterceptors();

export const updateHistory = async(payload: HistoryInterface): Promise<any> => {
    try{
        const config: AxiosRequestConfig = {
            url: `${apiConfig.updateHistory}`,
            method: "put",
            data: payload
        };
        const response = await api(config);
        return response.data;
    }catch(error){
        throw new Error("Gặp lỗi khi cập nhật dữ liệu");
    }
};