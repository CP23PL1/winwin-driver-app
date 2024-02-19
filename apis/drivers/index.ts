import axiosInstance from '../../libs/axios'
import { Driver } from './type'

class DriversApi {
  async getDriverById(id: string) {
    return axiosInstance<Driver>(`/drivers/${id}`, {
      params: {
        identify_by: 'phone_number',
      },
    }).then((res) => res.data)
  }

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
