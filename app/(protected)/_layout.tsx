import { Redirect, Slot } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useAuth0 } from 'react-native-auth0'
import { useQuery } from '@tanstack/react-query'
import { driversApi } from '../../apis/drivers'
import JobContextProvider from '../../contexts/job'

export default function ProtectedLayout() {
  const { user, isLoading: isAuth0Loading } = useAuth0()

  const {
    data: driverInfo,
    isLoading: isDriverInfoLoading,
    error,
  } = useQuery({
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
      <Slot />
    </JobContextProvider>
  )
}
