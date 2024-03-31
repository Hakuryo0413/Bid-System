import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { RoomInterface } from "../../../../types/RoomInterface";

const api = setupAxiosInterceptors();

const createNewRoom = async (
  payload: RoomInterface,
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.createRoom,
      method: "post",
      data: payload
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while creating new room");
  }
};

export default createNewRoom;
