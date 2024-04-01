import axiosInstance from '@/libs/axios'
import { Driver } from './type'
import { Paginate, PaginateParams } from '../shared/type'
import { DriveRequest } from '@/sockets/drive-request/type'

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

  async getMyDriveRequests(query?: PaginateParams) {
    return axiosInstance<Paginate<DriveRequest>>(`/drivers/me/drive-requests`, {
      params: query,
    }).then((res) => res.data)
  }

  async getMyDriveRequestById(id: string) {
    return axiosInstance<DriveRequest>(`/drivers/me/drive-requests/${id}`).then((res) => res.data)
  }
}

export const driversApi = new DriversApi()
