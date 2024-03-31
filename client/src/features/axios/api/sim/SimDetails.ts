import { propTypesOverlayProps } from "@material-tailwind/react/types/components/drawer";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const getSimByProvider = async (email: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.simProvider}/${email}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}

export const getSimById = async (id: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.simId}/${id}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}

export const getSimByNumber = async (number: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.simNumber}/${number}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}

export const getAllSims = async (): Promise<any> =>{
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.allSims}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}

