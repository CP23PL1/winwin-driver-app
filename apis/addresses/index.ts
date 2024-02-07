import axiosInstance from '../../libs/axios'

class AddressesApi {
  async getProvinces() {
    return axiosInstance(`/addresses/provinces`).then((res) => res.data)
  }

  async getDistricts(provinceId: string) {
    return axiosInstance(`/addresses/${provinceId}/districts`).then((res) => res.data)
  }

  async getSubDistricts(districtId: string) {
    return axiosInstance(`/addresses/districts/${districtId}/sub-districts`).then((res) => res.data)
  }
}

export const addressesApi = new AddressesApi()
