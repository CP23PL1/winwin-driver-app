import axiosInstance from '@/libs/axios'
import { PaginateParams } from '../shared/type'
import { AddressInfoResponse } from './type'

class AddressesApi {
  async getProvinces(params?: PaginateParams) {
    return axiosInstance<AddressInfoResponse>(`/addresses/provinces`, { params }).then(
      (res) => res.data,
    )
  }

  async getDistricts(provinceId: number, params?: PaginateParams) {
    return axiosInstance<AddressInfoResponse>(`/addresses/${provinceId}/districts`, {
      params,
    }).then((res) => res.data)
  }

  async getSubDistricts(districtId: number, params?: PaginateParams) {
    return axiosInstance<AddressInfoResponse>(`/addresses/districts/${districtId}/sub-districts`, {
      params,
    }).then((res) => res.data)
  }
}

export const addressesApi = new AddressesApi()
