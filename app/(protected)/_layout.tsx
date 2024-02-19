import { Redirect, Slot } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useAuth0 } from 'react-native-auth0'
import { useQuery } from 'react-query'
import { driversApi } from '../../apis/drivers'
import { Alert } from 'react-native'

function ProtectedLayout() {
  const { user, isLoading } = useAuth0()

  const { data: driverInfo, isLoading: isDriverInfoLoading } = useQuery(
    ['driver-info'],
    driversApi.getMyDriverInfo,
  )

  if (isLoading || isDriverInfoLoading) {
    return <LoaderScreen />
  }
  if (!user) {
    return <Redirect href="/landing" />
  }

  if (!driverInfo) {
    Alert.alert('ไม่พบข้อมูลคนขับ')
    return <Redirect href="/landing" />
  }

  return <Slot />
}

export default ProtectedLayout
