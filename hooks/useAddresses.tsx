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
    return lastPage.meta.totalPages > lastPage.meta.currentPage
      ? lastPage.meta.currentPage + 1
      : null
  }

  const { data: provinceQuery, fetchNextPage: fetchNextProvinces } = useInfiniteQuery(
    ['province-options'],
    ({ pageParam }) => addressesApi.getProvinces({ page: pageParam }),
    {
      getNextPageParam,
      optimisticResults: true,
    },
  )

  const {
    data: districtQuery,
    refetch: refetchDistricts,
    fetchNextPage: fetchNextDistricts,
  } = useInfiniteQuery(
    'district-options',
    ({ pageParam }) => addressesApi.getDistricts(filter!.provinceId, { page: pageParam }),
    {
      enabled: !!filter?.provinceId,
      getNextPageParam,
      optimisticResults: true,
    },
  )

  const {
    data: subDistrictQuery,
    refetch: refetchSubDistricts,
    fetchNextPage: fetchNextSubDistricts,
  } = useInfiniteQuery(
    'sub-district-options',
    ({ pageParam }) => addressesApi.getSubDistricts(filter!.districtId, { page: pageParam }),
    {
      enabled: !!filter?.districtId,
      getNextPageParam,
      optimisticResults: true,
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
    fetchNextDistricts,
    fetchNextSubDistricts,
    fetchNextProvinces,
  }
}
