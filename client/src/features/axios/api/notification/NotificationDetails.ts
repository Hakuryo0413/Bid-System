import { propTypesOverlayProps } from "@material-tailwind/react/types/components/drawer";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const getNotificationByAccount = async (email: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.notificationAccount}/${email}`,
            method: "get",
        };
        const response = await api(config);
        console.log("123", response);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}
export const getAllNotifications = async (): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: apiConfig.allNotifications,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về lịch sử");
    }
}
