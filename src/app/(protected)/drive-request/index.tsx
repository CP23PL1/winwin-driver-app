import { View, Text, Colors, Card } from 'react-native-ui-lib'
import { useJob } from '@/contexts/JobContext'
import { Button } from 'react-native-ui-lib'
import { Redirect, Stack, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Waypoint from '@/components/Waypoint'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { serviceSpotUtil } from '@/utils/service-spot'
import { commonUtil } from '@/utils/common'
import { SERVICE_CHARGE } from '@/constants/service-spots'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { driveRequestSocket } from '@/sockets/drive-request'
import { DriveRequestStatus } from '@/sockets/drive-request/type'

export default function DriveRequestDetail() {
  const { updateDriveRequestStatus, driveRequest, origin, destination } = useJob()
  const [newMessageReceived, setNewMessageReceived] = useState(false)

  const price = useMemo(() => {
    if (!driveRequest?.route) {
      return 0
    }
    return serviceSpotUtil.calculatePrice(driveRequest.route.distanceMeters / 1000)
  }, [driveRequest?.route?.distanceMeters])

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
    updateDriveRequestStatus(DriveRequestStatus.COMPLETED)
    router.push('/')
  }, [updateDriveRequestStatus])

  useEffect(() => {
    driveRequestSocket.on('chat-message-received', handleChatMessageReceived)

    return () => {
      driveRequestSocket.off('chat-message-received', handleChatMessageReceived)
    }
  }, [])

  if (!driveRequest || !origin || !destination) {
    return <Redirect href="/" />
  }

  return (
    <View style={{ padding: 10, height: '100%', gap: 10 }}>
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
      <Card padding-15 gap-10>
        <Text h4B>ข้อมูลเส้นทาง</Text>
        <View gap-10>
          <Waypoint
            placeDetail={{
              place_id: origin.place_id,
              geometry: origin.geometry,
              name: origin.formatted_address,
            }}
            styles={{ placeNameStyle: { fontSize: 18 } }}
            color={Colors.blue40}
            useDivider={false}
          />

          <Waypoint
            placeDetail={{
              place_id: destination?.place_id,
              geometry: destination?.geometry,
              name: destination?.formatted_address,
            }}
            styles={{ placeNameStyle: { fontSize: 18 } }}
            color={Colors.red40}
            useDivider={false}
          />
        </View>
      </Card>

      <Card padding-15 gap-10>
        <Text h4B>ข้อมูลการโดยสาร</Text>
        <View>
          <View row spread centerV>
            <Text h5>รหัสเรียกรถ</Text>
            <Text caption>{driveRequest.refCode}</Text>
          </View>
          <View row spread centerV>
            <Text>วันที่</Text>
            <Text>{moment(driveRequest.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
        </View>
        <View>
          <View row spread>
            <Text>ค่าโดยสารตามอัตรา</Text>
            <Text h4>{commonUtil.formatCurrency(price)}</Text>
          </View>
          <View row spread>
            <Text>ค่าเรียกรับบริการ</Text>
            <Text>{commonUtil.formatCurrency(SERVICE_CHARGE)}</Text>
          </View>
          <View row spread>
            <Text>ทั้งหมด</Text>
            <Text h4B>{commonUtil.formatCurrency(price + SERVICE_CHARGE)}</Text>
          </View>
        </View>
      </Card>

      <Card padding-15 gap-10>
        <Text h4B>ข้อมูลผู้โดยสาร</Text>
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
      {driveRequest.status === DriveRequestStatus.ON_GOING && (
        <Button
          label="ถึงจุดรับผู้โดยสารแล้ว"
          onPress={() => updateDriveRequestStatus(DriveRequestStatus.ARRIVED)}
        />
      )}
      {driveRequest.status === DriveRequestStatus.ARRIVED && (
        <Button
          label="รับผู้โดยสารแล้ว"
          onPress={() => updateDriveRequestStatus(DriveRequestStatus.PICKED_UP)}
        />
      )}
      {driveRequest.status === DriveRequestStatus.PICKED_UP && (
        <Button label="ส่งผู้โดยสารแล้ว" onPress={handleFinishDriveRequest} />
      )}
    </View>
  )
}
