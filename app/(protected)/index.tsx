import { useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from 'react-native-ui-lib'

function Home() {
  const router = useRouter()
  const { user, clearCredentials, clearSession } = useAuth0()

  const signOut = () => {
    clearCredentials()
    clearSession()
  }

  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Button
        label="Create Service Spot"
        onPress={() => router.push('/(protected)/add-new-service-spot/')}
      />
      <Button label="Logout" onPress={signOut} />
    </SafeAreaView>
  )
}

export default Home
