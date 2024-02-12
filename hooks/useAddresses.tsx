import { GetNextPageParamFunction, useInfiniteQuery, useQueryClient } from 'react-query'
import { addressesApi } from '../apis/addresses'
import { AddressInfo, AddressInfoResponse } from '../apis/addresses/type'
import { useEffect, useState } from 'react'

export type AddressOptionFilter = {
  provinceId: number
  districtId: number
}

export const useAddressOptions = (filter: AddressOptionFilter) => {
  // TODO: Implement this function
  const getNextPageParam: GetNextPageParamFunction<AddressInfoResponse> = (lastPage) => {
    return lastPage.meta.currentPage + 1
  }

  const { data: provinceQuery } = useInfiniteQuery(
    ['province-options'],
    ({ pageParam }) => addressesApi.getProvinces({ page: pageParam }),
    {
      getNextPageParam,
    },
  )

  const { data: districtQuery, refetch: refetchDistricts } = useInfiniteQuery(
    'district-options',
    ({ pageParam }) => addressesApi.getDistricts(filter!.provinceId, { page: pageParam }),
    {
      enabled: !!filter?.provinceId,
      getNextPageParam,
    },
  )

  const { data: subDistrictQuery, refetch: refetchSubDistricts } = useInfiniteQuery(
    'sub-district-options',
    ({ pageParam }) => addressesApi.getSubDistricts(filter!.districtId, { page: pageParam }),
    {
      enabled: !!filter?.districtId,
      getNextPageParam,
    },
  )

  useEffect(() => {
    if (filter.provinceId) {
      refetchDistricts()
    }
  }, [filter.provinceId])

  useEffect(() => {
    if (filter.districtId) {
      refetchSubDistricts()
    }
  }, [filter.districtId])

  return {
    provinces: provinceQuery?.pages.flatMap((provinces) => provinces.data),
    districts: districtQuery?.pages.flatMap((districts) => districts.data),
    subDistricts: subDistrictQuery?.pages.flatMap((subDistrict) => subDistrict.data),
  }
}
