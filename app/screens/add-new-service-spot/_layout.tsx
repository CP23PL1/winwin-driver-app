import { Redirect, Slot } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { LoaderScreen } from 'react-native-ui-lib'
import { View } from 'react-native-ui-lib'

function ProtectedLayout() {
  // const { user, isLoading } = useAuth0()

  // if (isLoading) {
  //   return <LoaderScreen />
  // }

  // if (!user) {
  //   return <Redirect href="/login" />
  // }

  return <View flex paddingH-30 paddingT-20>
    <Slot />
  </View>
}

export default ProtectedLayout
