import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";

const api = setupAxiosInterceptors();

export const updateSim = async (id: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.updateSim}/${id}`,
            method: "patch",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi cập nhật dữ liệu");
    }
};