import { useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { Card, Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { MaterialIcons } from '@expo/vector-icons'
import { driversApi } from '../../apis/drivers'
import { useQuery } from 'react-query'

function Home() {
  const router = useRouter()
  const { clearCredentials } = useAuth0()

  const { data: driverInfo } = useQuery('driver-info', driversApi.getMyDriverInfo)

  const signOut = () => {
    clearCredentials()
  }

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
              source={require('../../assets/avatar.png')}
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
          <View flex right paddingR-15>
            <MaterialIcons name="logout" size={24} color="#B51616" onPress={signOut} />
          </View>
        </Card>
      </View>
      <View flex paddingH-10 paddingT-15>
        <View paddingV-15>
          <TouchableOpacity onPress={() => router.push('/(protected)/add-new-service-spot/')}>
            <Text h4B center>
              เพิ่มซุ้มวินมอเตอร์ไซค์รับจ้าง
            </Text>
          </TouchableOpacity>
        </View>
        <View paddingV-15>
          <TouchableOpacity>
            <Text h4B center>
              เข้าร่วมซุ้มวินมอเตอร์ไซค์รับจ้าง
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Home
