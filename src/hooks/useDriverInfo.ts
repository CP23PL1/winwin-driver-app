import { driversApi } from '@/apis/drivers'
import { useQuery } from '@tanstack/react-query'

export const DRIVER_INFO_QUERY_KEY = ['driver-info']

export const useDriverInfo = () => {
  return useQuery({
    queryKey: DRIVER_INFO_QUERY_KEY,
    queryFn: driversApi.getMyDriverInfo,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
