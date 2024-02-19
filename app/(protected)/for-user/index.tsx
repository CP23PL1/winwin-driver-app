import { useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import {
  Card,
  Colors,
  Image,
  Text,
  Button,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native-ui-lib'
import { MaterialIcons } from '@expo/vector-icons'
import { driversApi } from '../../../apis/drivers'
import { useQuery } from 'react-query'
import { FontAwesome } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useState } from 'react'

function HomeMain() {
  const router = useRouter()
  const { clearCredentials } = useAuth0()
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const { data: driverInfo } = useQuery('driver-info', driversApi.getMyDriverInfo)

  return (
    <View backgroundColor="#FDA84B" paddingH-20 paddingT-75 flex>
      <View row>
        <Card
          row
          paddingV-30
          paddingH-10
          containerStyle={{ width: '100%', elevation: 20, shadowColor: Colors.black }}
        >
          <View paddingH-20>
            <Image
              borderRadius={100}
              style={{ height: 70, width: 70 }}
              source={require('../../../assets/avatar.png')}
            />
          </View>
          <View>
            <View>
              <Text bodyB>
                {driverInfo?.firstName} {driverInfo?.lastName}
              </Text>
            </View>
            <View>
              <Text body color="gray">
                8กม4254 กทม
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  )
}

export default HomeMain
