import { useAuth0 } from 'react-native-auth0'
import { useQueryClient } from 'react-query'
import apis from '../apis'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DriverDto } from '@cp23pl1/winwin-client-sdk'

export function useUser() {
  const queryClient = useQueryClient()
  const { user, isLoading: isUserLoading } = useAuth0()
  const [profile, setProfile] = useState<DriverDto | null>(null)
  const [isProfileLoading, setIsProfileLoading] = useState(false)

  const fetchDriverProfile = useCallback(async (userId: string) => {
    const cachedDriverProfile = queryClient.getQueryData<DriverDto>(['driver', userId])
    if (cachedDriverProfile) {
      console.log('get cached driver profile')
      setProfile(cachedDriverProfile)
      return
    }

    setIsProfileLoading(true)

    const driverProfile = await queryClient.fetchQuery({
      queryKey: ['driver', userId],
      queryFn: () => apis.drivers.findOne(userId, 'uid').then((res) => res.data),
    })
    queryClient.setQueryData(['driver', userId], driverProfile)
    setProfile(driverProfile)
  }, [])

  const isLoading = useMemo(() => {
    return isUserLoading || isProfileLoading
  }, [isUserLoading, isProfileLoading])

  useEffect(() => {
    if (!user?.sub) return
    fetchDriverProfile(user.sub).finally(() => setIsProfileLoading(false))
  }, [user?.sub])

  return { user, profile, isLoading }
}
