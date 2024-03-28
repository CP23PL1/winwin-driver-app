import axiosInstance from '@/libs/axios'
import { DriveRequest } from '@/sockets/drive-request/type'

class DriveRequestsApi {
  getDriveRequestById(id: string) {
    return axiosInstance<DriveRequest>(`/drive-requests/${id}`).then((res) => res.data)
  }
}

export const driveRequestsApi = new DriveRequestsApi()
