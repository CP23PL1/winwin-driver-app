import { GetNextPageParamFunction, useInfiniteQuery } from '@tanstack/react-query'
import { addressesApi } from '../apis/addresses'
import { AddressInfoResponse } from '../apis/addresses/type'
import { useEffect } from 'react'

export type AddressOptionFilter = {
  provinceId: number
  districtId: number
}

export const useAddressOptions = (filter: AddressOptionFilter) => {
  // TODO: Implement this function
  const getNextPageParam: GetNextPageParamFunction<number, AddressInfoResponse> = (lastPage) => {
    const nextPage = lastPage.meta.currentPage + 1
    return nextPage < lastPage.meta.totalPages ? nextPage : undefined
  }

  const { data: provinceQuery, fetchNextPage: fetchNextProvinces } = useInfiniteQuery({
    queryKey: ['province-options'],
    queryFn: ({ pageParam }) => addressesApi.getProvinces({ page: pageParam }),
    getNextPageParam,
    initialPageParam: 1,
  })

  const {
    data: districtQuery,
    refetch: refetchDistricts,
    fetchNextPage: fetchNextDistricts,
  } = useInfiniteQuery({
    queryKey: ['district-options'],
    queryFn: ({ pageParam }) => addressesApi.getDistricts(filter!.provinceId, { page: pageParam }),
    getNextPageParam,
    initialPageParam: 1,
    enabled: !!filter?.provinceId,
  })

  const {
    data: subDistrictQuery,
    refetch: refetchSubDistricts,
    fetchNextPage: fetchNextSubDistricts,
  } = useInfiniteQuery({
    queryKey: ['sub-district-options'],
    queryFn: ({ pageParam }) =>
      addressesApi.getSubDistricts(filter!.districtId, { page: pageParam }),
    getNextPageParam,
    initialPageParam: 1,
    enabled: !!filter?.districtId,
  })

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
