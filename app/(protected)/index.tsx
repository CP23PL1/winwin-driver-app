import { useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from 'react-native-ui-lib'

function Home() {
  const { clearCredentials } = useAuth0()

  const signOut = () => {
    clearCredentials()
  }

  return (
    <SafeAreaView>
      <Button label="Logout" onPress={signOut} />
    </SafeAreaView>
  )
}

export default Home
