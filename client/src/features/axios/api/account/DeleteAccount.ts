import apiConfig from "../../../../utils/apiConfig";
import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";

const api = setupAxiosInterceptors();


const deleteJob = async (id: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.deleteAccountId}/${id}`,
            method: "delete",
        };
        await api(config);
    } catch (error) {
        throw new Error("error while deleting the account");
    }
};

export default deleteJob;