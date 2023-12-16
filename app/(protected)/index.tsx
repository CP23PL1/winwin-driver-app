import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-ui-lib'
import { useUser } from '../../hooks/useUser'

function Home() {
  const { profile } = useUser()

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Text>{profile?.firstName}</Text>
    </SafeAreaView>
  )
}

export default Home
