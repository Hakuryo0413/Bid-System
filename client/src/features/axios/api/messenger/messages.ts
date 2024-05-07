import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";

const userApi = setupAxiosInterceptors();

export const getUserMessages = async(conId:string|undefined): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}/${conId}`,
            method: 'get'
        }
        const res = await userApi(config);
        return res.data;
    } catch (error) {
        throw new Error('Error while getting user messages');
    }
}

export const postUserMessages = async(message: {}): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}`,
            method: 'post',
            data: message
        }
        const res = await userApi(config);
        return res.data;
    } catch (error) {
        throw new Error('Error while posting user messages');
    }
}

