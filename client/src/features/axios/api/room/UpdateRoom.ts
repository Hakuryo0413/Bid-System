import { RoomInterface } from "../../../../types/RoomInterface";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import axios, { AxiosRequestConfig } from "axios";

const api = setupAxiosInterceptors();

export const updateRoom = async (payload: RoomInterface): Promise<any> => {

    try {
        const config: AxiosRequestConfig = {
        url: `${apiConfig.updateRoom}`,
        method: "put",
        data: payload,
        };
        console.log('hi')
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw new Error("Gặp lỗi khi cập nhật đơn hàng. ");
      }
};