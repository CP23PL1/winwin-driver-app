import { Redirect, Slot } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useUser } from '../../hooks/useUser'

function ProtectedLayout() {
  const { user, profile, isLoading } = useUser()

  if (isLoading) {
    return <LoaderScreen />
  }

  if (!user) {
    return <Redirect href="/login" />
  }

  if (!profile) {
    return <Redirect href="/(protected)/register" />
  }

  return <Slot />
}

export default ProtectedLayout
