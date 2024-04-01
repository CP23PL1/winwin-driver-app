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
import DriverInfo from '@/components/DriverInfo'

function ServiceSpotScreen() {
  const { data: driverInfo } = useDriverInfo()

  const { data: serviceSpot } = useQuery({
    queryKey: ['service-spot', driverInfo?.serviceSpot.id],
    queryFn: () => serviceSpotsApi.getServiceSpotById(driverInfo!.serviceSpot.id),
    enabled: !!driverInfo?.serviceSpot.id,
  })

  console.log(serviceSpot)

  const { data: serviceSpotDrivers } = useQuery({
    queryKey: ['service-spot', driverInfo?.serviceSpot.id, 'drivers'],
    queryFn: () => serviceSpotsApi.getServiceSpotDriversById(driverInfo!.serviceSpot.id),
    enabled: !!driverInfo?.serviceSpot.id,
  })

  const isOwner = useMemo(() => {
    return driverInfo?.id === serviceSpot?.serviceSpotOwner.id
  }, [driverInfo, serviceSpot])

  if (!serviceSpot) return <LoaderScreen />

  return (
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
            <Text>{serviceSpot.formattedAddress}</Text>
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
          <DriverInfo driver={serviceSpot.serviceSpotOwner.info} />
        </View>
        <View flex gap-10>
          <View row centerV spread>
            <Text bodyB>สมาชิก</Text>
            {isOwner && (
              <Text caption color={Colors.$textPrimary} he>
                แก้ไข
              </Text>
            )}
          </View>
          <FlashList
            data={serviceSpotDrivers?.data || []}
            ListEmptyComponent={() => <Text>ไม่มีสมาชิกภายในซุ้มวินนี้</Text>}
            estimatedItemSize={100}
            ItemSeparatorComponent={() => <View height={15} />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <DriverInfo driver={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ServiceSpotScreen
