import axiosInstance from '@/libs/axios'
import { CreateServiceSpot } from './type'

class ServiceSpotsApi {
  createServiceSpot(data: CreateServiceSpot) {
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
}

export const serviceSpotsApi = new ServiceSpotsApi()
