import { useDriverInfo } from '@/hooks/useDriverInfo'
import { commonUtil } from '@/utils/common'
import { Stack, router } from 'expo-router'
import React from 'react'
import { Card, Colors, Image, LoaderScreen, Text, View } from 'react-native-ui-lib'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

export default function DriverCardModal() {
  const { data: driverInfo } = useDriverInfo()

  if (!driverInfo) return <LoaderScreen />

  return (
    <View flex center>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <SafeAreaView style={styles.screenHeader}>
              <Entypo name="chevron-thin-left" size={30} color="black" onPress={router.back} />
            </SafeAreaView>
          ),
          orientation: 'landscape',
        }}
      />
      <Card padding-14 gap-25 backgroundColor={Colors.$backgroundPrimaryLight} style={styles.card}>
        <View spread row br40>
          <View style={{ ...styles.titleContainer, borderColor: Colors.$backgroundPrimaryHeavy }}>
            <Text h5>บัตรแสดงสถานะข้อมูลผู้ขับขี่</Text>
            <Text caption ellipsizeMode="tail" numberOfLines={1}>
              {driverInfo.serviceSpot.name}
            </Text>
          </View>
          <Image
            source={require('../../../assets/logo/icon.png')}
            width={40}
            height={40}
            resizeMode="contain"
            borderRadius={10}
          />
        </View>

        <View row spread>
          <View row gap-15>
            <Image
              source={{ uri: driverInfo.info.profileImage }}
              aspectRatio={1 / 1}
              borderRadius={10}
              width={100}
            />
            <View>
              <Text h4B>
                {driverInfo.info.firstName} {driverInfo.info.lastName}
              </Text>
              <Text caption>{commonUtil.formatPhoneNumber(driverInfo.info.phoneNumber)}</Text>
              <Text caption>
                {driverInfo.info.vehicle.manufactor} {driverInfo.info.vehicle.model}
              </Text>
              <Text caption>
                {driverInfo.info.vehicle.plate} {driverInfo.info.vehicle.province}
              </Text>
            </View>
          </View>
          <View center paddingT-10>
            <Text caption>วินหมายเลข</Text>
            <Text style={styles.driverNumberText}>{driverInfo.info.no}</Text>
          </View>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screenHeader: { position: 'absolute', top: 0, left: 20 },
  card: {
    width: '60%',
    elevation: 10,
  },
  titleContainer: {
    flexShrink: 1,
    borderLeftWidth: 3,
    paddingHorizontal: 10,
  },
  driverNumberText: { fontSize: 48, fontFamily: 'NotoSansThaiBold' },
})
