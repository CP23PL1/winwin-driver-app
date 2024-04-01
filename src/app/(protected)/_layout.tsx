import { Redirect, Stack } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useAuth0 } from 'react-native-auth0'

import { useDriverInfo } from '@/hooks/useDriverInfo'
import JobContextProvider from '@/contexts/JobContext'

export default function ProtectedLayout() {
  const { user, isLoading: isAuth0Loading } = useAuth0()

  const { data: driverInfo, isLoading: isDriverInfoLoading } = useDriverInfo()

  if (isAuth0Loading || isDriverInfoLoading) {
    return <LoaderScreen />
  }

  if (!user || !driverInfo) {
    return <Redirect href="/login" />
  }

  return (
    <JobContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          orientation: 'default',
          animation: 'slide_from_right',
        }}
      />
    </JobContextProvider>
  )
}
