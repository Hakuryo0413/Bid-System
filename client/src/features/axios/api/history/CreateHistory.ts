import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { HistoryInterface } from "../../../../types/HistoryInterface";

const api = setupAxiosInterceptors();

const createNewHistory = async (
  payload: HistoryInterface,
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.createHistory,
      method: "post",
      data: payload
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while creating new history");
  }
};

export default createNewHistory;
