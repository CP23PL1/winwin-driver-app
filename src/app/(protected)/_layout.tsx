import { Redirect, Slot, Stack, usePathname } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useAuth0 } from 'react-native-auth0'
import { useQuery } from '@tanstack/react-query'
import { driversApi } from '@/apis/drivers'
import JobContextProvider from '@/contexts/JobContext'

export default function ProtectedLayout() {
  const { user, isLoading: isAuth0Loading } = useAuth0()

  const { data: driverInfo, isLoading: isDriverInfoLoading } = useQuery({
    queryKey: ['driver-info'],
    queryFn: driversApi.getMyDriverInfo,
  })

  if (isAuth0Loading || isDriverInfoLoading) {
    return <LoaderScreen />
  }

  if (!user || !driverInfo) {
    return <Redirect href="/login" />
  }

  return (
    <JobContextProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </JobContextProvider>
  )
}
