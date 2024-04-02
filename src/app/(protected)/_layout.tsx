import { Redirect, Stack } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useAuth0 } from 'react-native-auth0'

import { useDriverInfo } from '@/hooks/useDriverInfo'
import { useJob } from '@/contexts/JobContext'
import { useEffect } from 'react'

export default function ProtectedLayout() {
  const { user, isLoading: isAuth0Loading } = useAuth0()
  const { connectToSocket } = useJob()
  const { data: driverInfo, isLoading: isDriverInfoLoading } = useDriverInfo()

  useEffect(() => {
    if (driverInfo?.serviceSpot) {
      connectToSocket()
    }
  }, [driverInfo, connectToSocket])

  if (isAuth0Loading || isDriverInfoLoading) {
    return <LoaderScreen />
  }

  if (!user || !driverInfo) {
    return <Redirect href="/login" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        orientation: 'default',
        animation: 'slide_from_right',
      }}
    />
  )
}
