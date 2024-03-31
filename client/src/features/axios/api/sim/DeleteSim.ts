import apiConfig from "../../../../utils/apiConfig";
import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";

const api = setupAxiosInterceptors();


const deleteSimById = async (id: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.deleteRoomId}/${id}`,
            method: "delete",
        };
        await api(config);
    } catch (error) {
        throw new Error("error while deleting the sim");
    }
};

export const deleteSimByNumber = async (number: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.deleteRoomNumber}/${number}`,
            method: "delete",
        };
        await api(config);
    } catch (error) {
        throw new Error("error while deleting the sim");
    }
};

export default deleteSimById;
