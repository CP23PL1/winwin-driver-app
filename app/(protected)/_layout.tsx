import { Redirect, Slot } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useAuth0 } from 'react-native-auth0'

function ProtectedLayout() {
  const { user, isLoading } = useAuth0()

  if (isLoading) {
    return <LoaderScreen />
  }

  if (!user) {
    return <Redirect href="/landing" />
  }

  return <Slot />
}

export default ProtectedLayout
