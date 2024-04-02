import { router } from 'expo-router'
import {
  Card,
  LoaderScreen,
  Text,
  View,
  Colors,
  Switch,
  GridView,
  Avatar,
} from 'react-native-ui-lib'

import { useJob } from '@/contexts/JobContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions, StyleSheet } from 'react-native'
import { AntDesign, MaterialIcons, FontAwesome5, Entypo, Octicons } from '@expo/vector-icons'
import { useDriverInfo } from '@/hooks/useDriverInfo'
import Waypoint from '@/components/Waypoint'
import DriveRequestStatusChip from '@/components/drive-request/DriveRequestStatusChip'
import DriverInfo from '@/components/DriverInfo'

export default function Home() {
  const { driveRequest, isOnline, updateDriverOnlineStatus } = useJob()

  const { data: driver, isOwnedServiceSpot } = useDriverInfo()

  if (!driver) return <LoaderScreen />

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h5B>
          สวัสดี! {driver.info.firstName} {driver.info.lastName} 👋
        </Text>
        <Text caption>ขอให้วันนี้เป็นวันที่ดีของคุณ</Text>
      </View>
      <Card row centerV gap-15 padding-15>
        <DriverInfo
          customAvatarComponent={
            <Avatar
              source={{ uri: driver.info.profileImage }}
              badgePosition="BOTTOM_RIGHT"
              badgeProps={{
                backgroundColor: isOnline ? Colors.green30 : Colors.grey40,
              }}
            />
          }
          driver={driver.info}
          renderVehicle={(vehicle) => `${vehicle.plate} ${vehicle.province}`}
        />
      </Card>
      <Card row spread padding-15 centerV>
        <Text h5B>{isOnline ? 'กำลังรับงาน' : 'เริ่มรับงาน'}</Text>
        <Switch
          value={isOnline}
          onValueChange={updateDriverOnlineStatus}
          onColor={Colors.green30}
          offColor={Colors.grey40}
        />
      </Card>
      <Card row padding-15 centerV spread onPress={() => router.push('/service-spot')}>
        <View row gap-10 centerV>
          <FontAwesome5 name="map-marker-alt" size={20} color={Colors.$iconPrimary} />
          <Text caption numberOfLines={1} ellipsizeMode="tail" color={Colors.$textPrimary}>
            {driver.serviceSpot.name}
          </Text>
        </View>
        <Entypo name="chevron-thin-right" size={20} color={Colors.$iconPrimary} />
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
            renderCustomItem: () =>
              isOwnedServiceSpot ? (
                <Card
                  center
                  padding-20
                  gap-10
                  onPress={() => router.push('/(protected)/invite-code')}
                >
                  <Octicons name="code-of-conduct" size={40} color="black" />
                  <Text caption>สร้างโค้ดเชิญ</Text>
                </Card>
              ) : (
                <></>
              ),
          },
        ]}
      />
      {driveRequest?.id && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('window').width,
            padding: 20,
          }}
        >
          <Card padding-15 onPress={() => router.push('/drive-request')}>
            <View row spread centerV>
              <Text bodyB>กำลังดำเนินการ</Text>
              <DriveRequestStatusChip status={driveRequest.status!} />
            </View>
            <View gap-5 marginT-10>
              <Waypoint
                placeDetail={driveRequest.origin!}
                color={Colors.blue40}
                textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
              />
              <Waypoint
                placeDetail={driveRequest.destination!}
                color={Colors.red40}
                textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
              />
            </View>
          </Card>
        </View>
      )}
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
