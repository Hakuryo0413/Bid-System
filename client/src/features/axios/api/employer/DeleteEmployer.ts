import apiConfig from "../../../../utils/apiConfig";
import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";

const api = setupAxiosInterceptors();


const deleteJob = async (username: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.deleteEmployer}/${username}`,
            method: "delete",
        };
        await api(config);
    } catch (error) {
        throw new Error("error while deleting the job");
    }
};

export default deleteJob;