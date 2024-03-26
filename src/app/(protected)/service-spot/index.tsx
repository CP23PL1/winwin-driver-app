import { useCallback, useMemo, useState } from 'react'
import { Text, Button, View, TextField, Modal, Colors, Avatar } from 'react-native-ui-lib'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { serviceSpotUtil } from '@/utils/service-spot'
import TextFieldError from '@/components/TextFieldError'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { driversApi } from '@/apis/drivers'
import { useQuery } from '@tanstack/react-query'

function ServiceSpotScreen() {
  const { data: driverInfo } = useQuery({
    queryKey: ['driver-info'],
    queryFn: driversApi.getMyDriverInfo,
  })
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View row center marginB-30 paddingH-10 marginT-15>
          <Pressable
            style={{
              position: 'absolute',
              left: 25,
              alignItems: 'center',
            }}
            onPress={router.back}
          >
            <View
              padding-5
              style={{
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 10,
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </View>
          </Pressable>
          <View paddingH-50>
            <Text h4B white>
              {driverInfo?.serviceSpot.name}
            </Text>
          </View>
        </View>
        <View
          flex
          paddingH-25
          paddingV-25
          bg-white
          style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
        >
          <View row gap-15>
            <AntDesign name="enviroment" size={28} color={Colors.$textPrimary} />
            <View flex>
              <Text>
                {driverInfo?.serviceSpot.addressLine1} {driverInfo?.serviceSpot.subDistrictId}
              </Text>
              <View left>
                <Button none avoidInnerPadding avoidMinWidth>
                  <Text primary>อัตราค่าบริการ</Text>
                </Button>
              </View>
            </View>
          </View>
          <View bg-grey60 height={1} marginV-15></View>
          <View gap-10>
            <Text bodyB>ผู้ดูแล</Text>
            <View row gap-15 paddingB-15>
              <Avatar source={{ uri: driverInfo?.info.profileImage }} />
              <View>
                <Text bodyB>
                  {driverInfo?.info.firstName} {driverInfo?.info.lastName}
                </Text>
                <Text>วินหมายเลข {driverInfo?.info.no}</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.$textPrimary,
  },
})

export default ServiceSpotScreen
