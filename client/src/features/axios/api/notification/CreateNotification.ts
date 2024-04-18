import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { NotificationInterface, NotificationPayload } from "../../../../types/NotificationInterface";

const api = setupAxiosInterceptors();

const createNewNotification = async (
  payload: NotificationInterface,
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.createNotification}`,
      method: "post",
      data: payload
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while creating new notification");
  }
};

export default createNewNotification;
