import { View, Text, Colors, Card } from 'react-native-ui-lib'
import { useJob } from '@/contexts/JobContext'
import { Button } from 'react-native-ui-lib'
import { Redirect, Stack, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Waypoint from '@/components/Waypoint'
import { useCallback, useEffect, useState } from 'react'
import { commonUtil } from '@/utils/common'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { driveRequestSocket } from '@/sockets/drive-request'
import { DriveRequestSessionStatus } from '@/sockets/drive-request/type'
import GoogleNavigationBtn from '@/components/map/GoogleNavigationBtn'
import DriveRequestStatusChip from '@/components/drive-request/DriveRequestStatusChip'

export default function DriveRequestDetail() {
  const { updateDriveRequestStatus, driveRequest } = useJob()
  const [newMessageReceived, setNewMessageReceived] = useState(false)

  const handleChatMessageReceived = () => {
    setNewMessageReceived(true)
  }

  const handleChatBubblePressed = useCallback(() => {
    if (newMessageReceived) {
      setNewMessageReceived(false)
    }
    router.push('/drive-request/chat')
  }, [newMessageReceived])

  const handleFinishDriveRequest = useCallback(() => {
    updateDriveRequestStatus(DriveRequestSessionStatus.COMPLETED)
    router.push('/')
  }, [updateDriveRequestStatus])

  useEffect(() => {
    driveRequestSocket.on('chat-message-received', handleChatMessageReceived)

    return () => {
      driveRequestSocket.off('chat-message-received', handleChatMessageReceived)
    }
  }, [])
  console.log(driveRequest)
  if (!driveRequest) {
    return <Redirect href="/" />
  }

  return (
    <View flex spread>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ backgroundColor: 'white', elevation: 10, padding: 15 }}>
              <Text h4B center>
                รายละเอียดการเดินทาง
              </Text>
            </SafeAreaView>
          ),
        }}
      />
      <View style={{ padding: 10, gap: 10 }}>
        <Card padding-15 gap-10>
          <Text h5B>ข้อมูลเส้นทาง</Text>
          <View gap-10>
            <View row>
              <Waypoint
                placeDetail={driveRequest.origin!}
                styles={{ row: { flexGrow: 1 }, placeNameStyle: { fontSize: 16 } }}
                color={Colors.blue40}
                useDivider={false}
              />
              <View>
                <GoogleNavigationBtn location={driveRequest.origin?.location!} />
              </View>
            </View>
            <View row>
              <Waypoint
                placeDetail={driveRequest.destination!}
                styles={{ row: { flexGrow: 1 }, placeNameStyle: { fontSize: 16 } }}
                color={Colors.red40}
                useDivider={false}
              />
              <View>
                <GoogleNavigationBtn location={driveRequest.destination?.location!} />
              </View>
            </View>
          </View>
        </Card>

        <Card padding-15 gap-10>
          <Text h5B>ข้อมูลการโดยสาร</Text>
          <View gap-5>
            <View row spread centerV>
              <Text>รหัสเรียกรถ</Text>
              <Text caption>{driveRequest.id}</Text>
            </View>
            <View row spread centerV>
              <Text>วันที่</Text>
              <Text caption>{moment(driveRequest.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
            </View>
            <View row spread centerV>
              <Text>สถานะ</Text>
              <DriveRequestStatusChip status={driveRequest.status!} />
            </View>
          </View>

          <View>
            <View row spread>
              <Text>ค่าบริการตามอัตรา</Text>
              <Text h4B>{commonUtil.formatCurrency(driveRequest.priceByDistance)}</Text>
            </View>
            <View row spread>
              <Text>ค่าบริการ</Text>
              <Text h4B>{commonUtil.formatCurrency(driveRequest.serviceCharge)}</Text>
            </View>
            <View row spread>
              <Text>ทั้งหมด</Text>
              <Text h4B>{commonUtil.formatCurrency(driveRequest.total)}</Text>
            </View>
          </View>
        </Card>

        <Card padding-15 gap-10>
          <Text h5B>ข้อมูลผู้โดยสาร</Text>
          <View row spread>
            <View>
              <Text bodyB>
                {driveRequest.user.firstName} {driveRequest.user.lastName}
              </Text>
              <View row centerV gap-6>
                <FontAwesome5 name="phone-alt" size={16} color="black" />
                <Text>{commonUtil.formatPhoneNumber(driveRequest.user.phoneNumber)}</Text>
              </View>
            </View>
            <View>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={32}
                onPress={handleChatBubblePressed}
              />
              {newMessageReceived && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'red',
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                  }}
                />
              )}
            </View>
          </View>
        </Card>
      </View>

      <View paddingH-10 paddingB-20>
        {driveRequest.status === DriveRequestSessionStatus.ON_GOING && (
          <Button
            label="ถึงจุดรับผู้โดยสารแล้ว"
            onPress={() => updateDriveRequestStatus(DriveRequestSessionStatus.ARRIVED)}
          />
        )}
        {driveRequest.status === DriveRequestSessionStatus.ARRIVED && (
          <Button
            label="รับผู้โดยสารแล้ว"
            onPress={() => updateDriveRequestStatus(DriveRequestSessionStatus.PICKED_UP)}
          />
        )}
        {driveRequest.status === DriveRequestSessionStatus.PICKED_UP && (
          <Button label="ส่งผู้โดยสารแล้ว" onPress={handleFinishDriveRequest} />
        )}
      </View>
    </View>
  )
}
