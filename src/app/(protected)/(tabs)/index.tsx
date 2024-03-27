import { Redirect, router } from 'expo-router'
import {
  Card,
  LoaderScreen,
  Text,
  View,
  Avatar,
  Colors,
  Switch,
  GridView,
} from 'react-native-ui-lib'

import { useJob } from '@/contexts/JobContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { useDriverInfo } from '@/hooks/useDriverInfo'
import { DriveRequestSessionStatus } from '@/sockets/drive-request/type'

export default function Home() {
  const { driveRequest, isOnline, setIsOnline } = useJob()

  const { data: driverInfo } = useDriverInfo()

  if (!driverInfo) return <LoaderScreen />

  if (!driverInfo.serviceSpot) return <Redirect href="/signup" />

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h5B>
          สวัสดี! {driverInfo.info.firstName} {driverInfo.info.lastName} 👋
        </Text>
        <Text caption>ขอให้วันนี้เป็นวันที่ดีของคุณ</Text>
      </View>
      <Card row centerV gap-15 padding-15>
        <Avatar
          source={{ uri: driverInfo.info.profileImage }}
          badgePosition="BOTTOM_RIGHT"
          badgeProps={{
            backgroundColor: isOnline ? Colors.green30 : Colors.grey40,
          }}
        />
        <View>
          <Text h5B>
            {driverInfo.info.firstName} {driverInfo.info.lastName}
          </Text>
          <Text caption>
            {driverInfo.info.vehicle.plate} {driverInfo.info.vehicle.province}
          </Text>
          <Text caption>วินหมายเลข {driverInfo.info.no}</Text>
        </View>
      </Card>
      <Card row spread padding-15 centerV>
        <Text h5B>{isOnline ? 'กำลังรับงาน' : 'เริ่มรับงาน'}</Text>
        <Switch
          value={isOnline}
          onValueChange={setIsOnline}
          onColor={Colors.green30}
          offColor={Colors.grey40}
        />
      </Card>
      <GridView
        numColumns={2}
        items={[
          {
            renderCustomItem: () => (
              <Card
                center
                padding-20
                gap-10
                onPress={() => router.push('/(protected)/calculate-price')}
              >
                <MaterialIcons name="calculate" size={40} color="black" />
                <Text caption>คำนวนค่าโดยสาร</Text>
              </Card>
            ),
          },
          {
            renderCustomItem: () => (
              <Card
                center
                padding-20
                gap-10
                onPress={() => router.push('/(protected)/driver-card-modal')}
              >
                <AntDesign name="idcard" size={40} color="black" />
                <Text caption>แสดงบัตรวินวิน</Text>
              </Card>
            ),
          },
          {
            renderCustomItem: () => (
              <Card
                center
                padding-20
                gap-10
                onPress={() => router.push('/(protected)/service-spot')}
              >
                <AntDesign name="enviroment" size={40} color="black" />
                <Text caption>ซุ้มวินมอเตอร์ไซค์รับจ้าง</Text>
              </Card>
            ),
          },
        ]}
      />
      {/* {driveRequest && (
        <View absB absL padding-20>
          <Card padding-20 onPress={() => router.push('/drive-request')}>
            <Text>{driveRequest.origin?.name}</Text>
            <Text>
              {driveRequest.status === DriveRequestSessionStatus.ARRIVED && 'ถึงแล้ว'}
              {driveRequest.status === DriveRequestSessionStatus.PICKED_UP && 'รับลูกค้าแล้ว'}
              {driveRequest.status === DriveRequestSessionStatus.ON_GOING && 'กำลังเดินทาง'}
            </Text>
          </Card>
        </View>
      )} */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
})
