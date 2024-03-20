import { useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { Button, Card, Colors, Image, LoaderScreen, Text, View, Switch } from 'react-native-ui-lib'
import { driversApi } from '@/apis/drivers'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import ShowModal from '@/components/showModal'
import { useJob } from '@/contexts/JobContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function Home() {
  const router = useRouter()
  const { clearSession } = useAuth0()
  const [showWinWinCard, setShowWinWinCard] = useState(false)
  const [onNewSpot, setOnNewSpot] = useState(false)
  const [onJoinSpot, setOnJoinSpot] = useState(false)
  const { isOnline, setIsOnline } = useJob()

  const { data: driverInfo } = useQuery({
    queryKey: ['driver-info'],
    queryFn: driversApi.getMyDriverInfo,
  })

  const signOut = () => {
    clearSession()
  }

  const onSelectNewSpot = () => {
    if (onNewSpot == false) {
      setOnNewSpot(true)
      setOnJoinSpot(false)
    } else {
      setOnNewSpot(false)
      setOnJoinSpot(false)
    }
  }

  const onSelectJoinSpot = () => {
    if (onJoinSpot == false) {
      setOnNewSpot(false)
      setOnJoinSpot(true)
    } else {
      setOnNewSpot(false)
      setOnJoinSpot(false)
    }
  }

  const onSubmit = () => {
    if (onNewSpot == true) {
      router.push('/add-new-service-spot')
    }
    if (onJoinSpot == true) {
      router.push('/chat')
    }
  }

  const showWinWinCardModal = () => {
    setShowWinWinCard(true)
  }

  if (!driverInfo) return <LoaderScreen />

  return driverInfo.serviceSpot ? (
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
            src={driverInfo.info.profileImage}
          />
        </View>
        <View paddingV-10 center>
          <Text h4B white>
            {driverInfo.info.firstName} {driverInfo.info.lastName}
          </Text>
        </View>
        <View paddingV-10 center>
          <Text h4B white>
            {driverInfo.phoneNumber.replace(/\+66/g, '0')}
          </Text>
        </View>
        <View paddingV-10 center>
          <Text h4B white center>
            {driverInfo.info.vehicle.manufactor} {driverInfo.info.vehicle.model}
          </Text>
        </View>
        <View paddingV-10 center>
          <Text h4B white center>
            {driverInfo.info.vehicle.plate}
          </Text>
          <Text h4B white center>
            {driverInfo.info.vehicle.province}
          </Text>
        </View>
      </ShowModal>
      <View row>
        <Card
          row
          padding-15
          containerStyle={{ width: '100%', elevation: 20, shadowColor: Colors.black }}
        >
          <View row centerV spread width="100%" paddingH-4>
            <View row gap-12>
              <Image
                borderRadius={100}
                style={{ height: 70, width: 70 }}
                src={driverInfo.info.profileImage}
              />
              <View>
                <Text bodyB>
                  {driverInfo.info.firstName} {driverInfo.info.lastName}
                </Text>
                <Text color="gray">{driverInfo.info.vehicle.plate}</Text>
                <View row gap-5 centerV>
                  <AntDesign name="enviroment" size={18} color={Colors.red30} />
                  <Text color="gray">
                    {driverInfo.serviceSpot ? driverInfo.serviceSpot.name : 'ยังไม่มีซุ้มวิน'}
                  </Text>
                </View>
              </View>
            </View>
            <Text>{driverInfo.info.no ? <Text h1B>{driverInfo.info.no}</Text> : ''}</Text>
          </View>
        </Card>
      </View>
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
              <Text h4B>{isOnline ? 'กำลังหางาน' : 'เริ่มรับงาน'}</Text>
            </View>
            <View flex-1 right paddingR-15>
              <Switch onValueChange={setIsOnline} value={isOnline} onColor={'#2AAD1F'} />
            </View>
          </View>
        </View>
        <View paddingV-15>
          <Button whiteStyle paddingV-50 onPress={() => router.push('/calculate-price/')}>
            <Text h4B center>
              คำนวณค่าโดยสาร
            </Text>
          </Button>
        </View>
        <View paddingV-15>
          <Button whiteStyle paddingV-50 onPress={() => showWinWinCardModal()}>
            <Text h4B center>
              แสดงบัตร WinWin
            </Text>
          </Button>
        </View>
      </View>
      <View paddingB-40>
        <Button backgroundColor={Colors.red10} onPress={signOut}>
          <Text h4B white>
            ออกจากระบบ
          </Text>
        </Button>
      </View>
    </View>
  ) : (
    <View bg-white flex centerV>
      <View center>
        <Text h4B>คุณยังไม่ได้เป็นสมาชิกของซุ้มวินใด</Text>
        <View paddingT-50>
          <Text>กรุณาเลือกสร้างหรือเข้าร่วม</Text>
        </View>
      </View>
      <View row paddingV-25 center>
        <View paddingR-10>
          <Button
            bg-white
            style={{
              width: 125,
              height: 125,
              borderRadius: 70,
              borderWidth: 3,
              borderColor: onNewSpot ? '#FDA84B' : 'rgba(106, 106, 106, .25)',
            }}
            onPress={() => onSelectNewSpot()}
          >
            <MaterialCommunityIcons
              name="map-marker-plus"
              size={60}
              color={onNewSpot ? '#FDA84B' : 'rgba(106, 106, 106, .5)'}
            />
          </Button>
          <Text marginT-10 color={onNewSpot ? '#FDA84B' : '#000000'}>
            ลงทะเบียนซุ้มวินใหม่
          </Text>
        </View>
        <View paddingL-10>
          <Button
            bg-white
            style={{
              width: 125,
              height: 125,
              borderRadius: 70,
              borderWidth: 3,
              borderColor: onJoinSpot ? '#FDA84B' : 'rgba(106, 106, 106, .25)',
            }}
            onPress={() => onSelectJoinSpot()}
          >
            <MaterialCommunityIcons
              name="map-marker-account"
              size={60}
              color={onJoinSpot ? '#FDA84B' : 'rgba(106, 106, 106, .5)'}
            />
          </Button>
          <Text marginT-10 color={onJoinSpot ? '#FDA84B' : '#000000'}>
            เข้าร่วมซุ้มวินที่มีอยู่
          </Text>
        </View>
      </View>
      <View paddingH-25 paddingT-25>
        <Button
          disabled={!onJoinSpot && !onNewSpot}
          style={{ width: '100%' }}
          onPress={() => onSubmit()}
        >
          <Text bodyB white>
            ถัดไป
          </Text>
        </Button>
      </View>
    </View>
  )
}

export default Home
