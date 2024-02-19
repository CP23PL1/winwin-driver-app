import { useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import {
  Button,
  Card,
  Colors,
  Image,
  LoaderScreen,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native-ui-lib'
import { driversApi } from '../../apis/drivers'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import ShowModal from '../../components/showModal'

function Home() {
  const router = useRouter()
  const { clearCredentials } = useAuth0()
  const [isEnabled, setIsEnabled] = useState(false)
  const [showWinWinCard, setShowWinWinCard] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const { data: driverInfo } = useQuery({
    queryKey: ['driver-info'],
    queryFn: driversApi.getMyDriverInfo,
  })

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    // router.push('/calculate-price/job')
  }

  const signOut = () => {
    clearCredentials()
  }

  if (!driverInfo) return <LoaderScreen />

  const showWinWinCardModal = () => {
    setPhoneNumber(driverInfo?.phoneNumber.replace(/\+66/g, '0'))
    setShowWinWinCard(true)
  }

  return (
    <View backgroundColor="#FDA84B" paddingH-20 paddingT-75 flex>
      <ShowModal visible={showWinWinCard} onRequestClose={() => setShowWinWinCard(false)}>
        <View center paddingV-10>
          <Text h1B white>
            บัตร WinWin
          </Text>
        </View>
        <View center>
          <Image
            borderRadius={100}
            style={{ height: 150, width: 150 }}
            src={driverInfo.profileImage}
          />
        </View>
        <View paddingV-10 center>
          <Text h4B white>
            {driverInfo.firstName} {driverInfo.lastName}
          </Text>
        </View>
        <View paddingV-10 center>
          <Text h4B white>
            {phoneNumber}
          </Text>
        </View>
        <View paddingV-10 center>
          <Text h4B white center>
            {driverInfo.vehicle.manufactor} {driverInfo.vehicle.model}
          </Text>
        </View>
        <View paddingV-10 center>
          <Text h4B white center>
            {driverInfo.vehicle.plate}
          </Text>
          <Text h4B white center>
            {driverInfo.vehicle.province}
          </Text>
        </View>
      </ShowModal>
      <View row>
        <Card
          row
          center
          padding-15
          containerStyle={{ width: '100%', elevation: 20, shadowColor: Colors.black }}
        >
          <View row centerV gap-24>
            <Image
              borderRadius={100}
              style={{ height: 70, width: 70 }}
              src={driverInfo.profileImage}
            />
            <View>
              <Text bodyB>
                {driverInfo.firstName} {driverInfo.lastName}
              </Text>
              <Text color="gray">{driverInfo.vehicle.plate}</Text>
              <View row gap-5 centerV>
                <AntDesign name="enviroment" size={18} color={Colors.red30} />
                <Text color="gray">
                  {driverInfo.serviceSpot ? driverInfo.serviceSpot.name : 'ยังไม่มีซุ้มวิน'}
                </Text>
              </View>
            </View>
            <Text>{driverInfo.no ? <Text h1B>{driverInfo.no}</Text> : ''}</Text>
          </View>
        </Card>
      </View>
      {driverInfo.serviceSpot ? (
        <View flex paddingH-10 paddingT-15>
          <View paddingV-15>
            <View
              row
              centerV
              bg-white
              paddingV-15
              style={{
                borderRadius: 10,
              }}
            >
              <View felx-1 left paddingL-15>
                <Text h4B>{isEnabled ? 'กำลังหางาน' : 'เริ่มรับงาน'}</Text>
              </View>
              <View flex-1 right paddingR-15>
                <Switch onValueChange={toggleSwitch} value={isEnabled} onColor={'#2AAD1F'} />
              </View>
            </View>
          </View>
          <View paddingV-15>
            <TouchableOpacity onPress={() => router.push('/calculate-price/')}>
              <Text h4B center>
                คำนวณค่าโดยสาร
              </Text>
            </TouchableOpacity>
          </View>
          <View paddingV-15>
            <TouchableOpacity onPress={() => showWinWinCardModal()}>
              <Text h4B center>
                แสดงบัตร WinWin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
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
      )}
      <View paddingB-40>
        <Button backgroundColor={Colors.red10} onPress={signOut}>
          <Text h4B white>
            ออกจากระบบ
          </Text>
        </Button>
      </View>
    </View>
  )
}

export default Home
