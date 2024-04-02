import axiosInstance from '@/libs/axios'
import { CreateServiceSpot, ServiceSpotDetail } from './type'
import { Driver } from '../drivers/type'
import { Paginate } from '../shared/type'

class ServiceSpotsApi {
  async createServiceSpot(data: CreateServiceSpot) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('addressLine1', data.addressLine1)
    if (data.addressLine2) formData.append('addressLine2', data.addressLine2)
    formData.append('subDistrictId', data.subDistrictId.toString())
    formData.append('coords', JSON.stringify(data.coords))
    formData.append('serviceSpotOwnerId', data.serviceSpotOwnerId.toString())
    // @ts-ignore
    formData.append('priceRateImage', data.priceRateImage)

    return axiosInstance
      .post('/service-spots', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  }

  async getServiceSpotById(id: number) {
    return axiosInstance<ServiceSpotDetail>(`/service-spots/${id}`).then((res) => res.data)
  }

  async getServiceSpotDriversById(id: number) {
    return axiosInstance<Paginate<Driver>>(`/service-spots/${id}/drivers`).then((res) => res.data)
  }

  async getInviteCodeByServiceSpotId(serviceSpotId: number) {
    return axiosInstance<{ code: string; ttl: number }>(
      `/service-spots/${serviceSpotId}/invite-code`,
    ).then((res) => res.data)
  }

  async removeDriverFromServiceSpot({
    serviceSpotId,
    driverId,
  }: {
    serviceSpotId: number
    driverId: string
  }) {
    return axiosInstance.delete(`/service-spots/${serviceSpotId}/drivers/${driverId}`)
  }
}

export const serviceSpotsApi = new ServiceSpotsApi()
