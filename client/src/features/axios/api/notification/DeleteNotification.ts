import apiConfig from "../../../../utils/apiConfig";
import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";

const api = setupAxiosInterceptors();


const deleteNotification = async (id: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.deleteNotification}/${id}`,
            method: "delete",
        };
        await api(config);
    } catch (error) {
        throw new Error("error while deleting the notification");
    }
};

export default deleteNotification;