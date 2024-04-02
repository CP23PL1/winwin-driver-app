import { Text, Button, View, Colors, LoaderScreen, TouchableOpacity } from 'react-native-ui-lib'
import { AntDesign } from '@expo/vector-icons'
import { Stack, router } from 'expo-router'
import { useDriverInfo } from '@/hooks/useDriverInfo'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serviceSpotsApi } from '@/apis/service-spots'
import { useCallback, useMemo, useState } from 'react'
import DriverInfo from '@/components/DriverInfo'
import ServiceSpotMemberList from '@/components/service-spot/ServiceSpotMemberList'
import { Ionicons } from '@expo/vector-icons'

function ServiceSpotScreen() {
  const queryClient = useQueryClient()
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const { data: driverInfo, isOwnedServiceSpot } = useDriverInfo()

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

  const { mutate: removeDriverFromServiceSpot } = useMutation({
    mutationFn: serviceSpotsApi.removeDriverFromServiceSpot,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['service-spot', driverInfo?.serviceSpot.id, 'drivers'],
        type: 'active',
      })
    },
    onError: (error) => {
      // rollback cache
      console.error(error)
    },
  })

  const toggleEditMode = useCallback(() => {
    setMode((prev) => (prev === 'view' ? 'edit' : 'view'))
  }, [setMode, mode])

  if (!serviceSpot || !serviceSpotDrivers) return <LoaderScreen />

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: serviceSpot.name,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors.$backgroundPrimaryHeavy },
          headerStyle: { backgroundColor: Colors.$backgroundPrimaryHeavy },
          headerLeft: () => (
            <TouchableOpacity
              onPress={router.back}
              style={{
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'NotoSansThaiBold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <View flex padding-25 bg-white style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
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
            {isOwnedServiceSpot && serviceSpotDrivers?.data?.length > 0 && (
              <TouchableOpacity onPress={toggleEditMode}>
                {mode === 'edit' && <Text color={Colors.$iconDanger}>ยกเลิกการแก้ไข</Text>}
                {mode === 'view' && <Text color={Colors.$textPrimary}>แก้ไข</Text>}
              </TouchableOpacity>
            )}
          </View>
          <ServiceSpotMemberList
            mode={mode}
            drivers={serviceSpotDrivers?.data || []}
            onRemoveMember={(driverId) =>
              removeDriverFromServiceSpot({
                driverId,
                serviceSpotId: serviceSpot.id,
              })
            }
          />
        </View>
      </View>
    </>
  )
}

export default ServiceSpotScreen
