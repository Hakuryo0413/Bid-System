import { propTypesOverlayProps } from "@material-tailwind/react/types/components/drawer";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const getHistoryByAccount = async (email: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.historyAccount}/${email}`,
            method: "get",
        };
        const response = await api(config);
        console.log("input email", email);
        console.log("response data", response.data);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}

export const getHistoryById = async (id: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.historyId}/${id}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}

export const getAllHistories = async (): Promise<any> =>{
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.allHistory}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}