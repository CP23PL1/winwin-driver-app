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

  async joinServiceSpot(code: string) {
    return axiosInstance.patch('/drivers/service-spot/join', { code })
  }
}

export const driversApi = new DriversApi()
