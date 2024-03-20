import axiosInstance from '@/libs/axios'
import { Driver } from './type'

class DriversApi {
  async verifyDriverIdentity(phoneNumber: string) {
    return axiosInstance
      .post(`/drivers/verify`, { phoneNumber })
      .then(() => true)
      .catch(() => false)
  }

  async getMyDriverInfo() {
    return axiosInstance<Driver>('/drivers/me').then((res) => res.data)
  }
}

export const driversApi = new DriversApi()
