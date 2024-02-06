import axiosInstance from "../../libs/axios";
import { Driver } from "./type";

class DriversApi {
    async getDriverById(id: string) {
        return axiosInstance<Driver>(`/drivers/${id}`).then((res) => res.data)
    }
}

export const driversApi = new DriversApi();