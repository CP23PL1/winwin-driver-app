import { Text, Button, View, Colors, Avatar, LoaderScreen } from 'react-native-ui-lib'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { useDriverInfo } from '@/hooks/useDriverInfo'
import { useQuery } from '@tanstack/react-query'
import { serviceSpotsApi } from '@/apis/service-spots'
import { FlashList } from '@shopify/flash-list'
import { useMemo } from 'react'

function ServiceSpotScreen() {
  const { data: driverInfo } = useDriverInfo()
  const { data: serviceSpot } = useQuery({
    queryKey: ['service-spot', driverInfo?.serviceSpot.id],
    queryFn: () => serviceSpotsApi.getServiceSpotById(driverInfo!.serviceSpot.id),
    enabled: !!driverInfo?.serviceSpot.id,
  })
  const { data: serviceSpotDrivers } = useQuery({
    queryKey: ['service-spot', driverInfo?.serviceSpot.id, 'drivers'],
    queryFn: () => serviceSpotsApi.getServiceSpotDriversById(driverInfo!.serviceSpot.id),
    enabled: !!driverInfo?.serviceSpot.id,
  })

  const isOwner = useMemo(() => {
    return driverInfo?.id === serviceSpot?.serviceSpotOwner.id
  }, [driverInfo, serviceSpot])

  if (!serviceSpot || !serviceSpotDrivers) return <LoaderScreen />

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.$backgroundPrimaryHeavy }}>
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
            <Text h4B white center>
              {serviceSpot?.name}
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
                {serviceSpot?.addressLine1} {serviceSpot?.addressLine2}{' '}
                {serviceSpot?.address.nameTH} {serviceSpot?.address.district.nameTH}{' '}
                {serviceSpot?.address.district.province.nameTH}
              </Text>
              <View left>
                <Button none avoidInnerPadding avoidMinWidth>
                  <Text primary>อัตราค่าบริการ</Text>
                </Button>
              </View>
            </View>
          </View>
          <View bg-grey60 height={1} marginV-15></View>
          <View gap-10 paddingB-15>
            <Text bodyB>ผู้ดูแล</Text>
            <View row gap-15>
              <Avatar source={{ uri: serviceSpot?.serviceSpotOwner.info.profileImage }} />
              <View>
                <Text bodyB>
                  {serviceSpot?.serviceSpotOwner.info.firstName}{' '}
                  {serviceSpot?.serviceSpotOwner.info.lastName}
                </Text>
                <Text>วินหมายเลข {serviceSpot?.serviceSpotOwner.info.no}</Text>
              </View>
            </View>
          </View>
          <View flex>
            <View row centerV spread>
              <Text bodyB>สมาชิก</Text>
              {isOwner && (
                <Text caption color={Colors.$textPrimary} he>
                  แก้ไข
                </Text>
              )}
            </View>
            {serviceSpotDrivers?.data && (
              <FlashList
                data={serviceSpotDrivers.data}
                estimatedItemSize={100}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View row gap-15 paddingV-10>
                    <Avatar source={{ uri: item.profileImage }} />
                    <View>
                      <Text bodyB>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text>วินหมายเลข {item.no}</Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default ServiceSpotScreen
