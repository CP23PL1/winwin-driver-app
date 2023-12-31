import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { LoaderScreen } from 'react-native-ui-lib'

function ProtectedLayout() {
  const { user, isLoading } = useAuth0()

  if (isLoading) {
    return <LoaderScreen />
  }

  if (!user) {
    return <Redirect href="/login" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}

export default ProtectedLayout
