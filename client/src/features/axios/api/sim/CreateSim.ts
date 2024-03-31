import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { SimInterface } from "../../../../types/SimInterface";

const api = setupAxiosInterceptors();

const createNewSim = async (
  payload: SimInterface,
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.createSim,
      method: "post",
      data: payload
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while creating new sim");
  }
};

export default createNewSim;
