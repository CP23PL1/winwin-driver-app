import { driversApi } from '@/apis/drivers'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const DRIVER_INFO_QUERY_KEY = ['driver-info']

export const useDriverInfo = () => {
  const query = useQuery({
    queryKey: DRIVER_INFO_QUERY_KEY,
    queryFn: driversApi.getMyDriverInfo,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  const isOwnedServiceSpot = useMemo(() => {
    return query.data?.serviceSpot.serviceSpotOwnerId === query.data?.id
  }, [query.data])

  return { ...query, isOwnedServiceSpot }
}
