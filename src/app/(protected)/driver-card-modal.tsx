import { useDriverInfo } from '@/hooks/useDriverInfo'
import { commonUtil } from '@/utils/common'
import { Stack, router } from 'expo-router'
import React from 'react'
import { Avatar, Card, Colors, LoaderScreen, Text, View } from 'react-native-ui-lib'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DriverCardModal() {
  const { data: driverInfo } = useDriverInfo()

  if (!driverInfo) return <LoaderScreen />

  return (
    <View flex center>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <SafeAreaView style={{ position: 'absolute', top: 0, left: 20 }}>
              <Entypo name="chevron-thin-left" size={30} color="black" onPress={router.back} />
            </SafeAreaView>
          ),
          orientation: 'landscape',
        }}
      />

      <Card
        row
        gap-15
        padding-10
        centerV
        backgroundColor={Colors.$backgroundPrimaryHeavy}
        style={{ width: '60%', elevation: 10 }}
      >
        <Avatar source={{ uri: driverInfo.info.profileImage }} size={100} />
        <View>
          <Text h3B white>
            {driverInfo.info.firstName} {driverInfo.info.lastName}
          </Text>
          <Text white>{driverInfo.serviceSpot.name}</Text>
          <Text white>{commonUtil.formatPhoneNumber(driverInfo.phoneNumber)}</Text>
          <Text white>
            {driverInfo.info.vehicle.manufactor} {driverInfo.info.vehicle.model}
          </Text>
          <Text white>
            {driverInfo.info.vehicle.plate} {driverInfo.info.vehicle.province}
          </Text>
        </View>
      </Card>
    </View>
  )
}
