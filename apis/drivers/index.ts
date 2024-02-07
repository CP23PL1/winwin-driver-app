import axiosInstance from '../../libs/axios'
import { Driver } from './type'

class DriversApi {
  async getDriverById(id: string) {
    return axiosInstance<Driver>(`/drivers/${id}`).then((res) => res.data)
  }

  async verifyDriverIdentity(phoneNumber: string) {
    return axiosInstance
      .post(`/drivers/verify`, { phoneNumber })
      .then(() => true)
      .catch(() => false)
  }
}

export const driversApi = new DriversApi()
