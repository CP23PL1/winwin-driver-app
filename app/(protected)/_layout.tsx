import { Redirect, Slot } from 'expo-router'
import { LoaderScreen } from 'react-native-ui-lib'
import { useUser } from '../../hooks/useUser'

function ProtectedLayout() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <LoaderScreen />
  }

  if (!user) {
    return <Redirect href="/landing" />
  }

  return <Slot />
}

export default ProtectedLayout
