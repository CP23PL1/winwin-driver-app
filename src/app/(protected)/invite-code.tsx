import { serviceSpotsApi } from '@/apis/service-spots'
import { useDriverInfo } from '@/hooks/useDriverInfo'
import { useQuery } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import moment from 'moment'
import React, { useMemo } from 'react'
import { View, Text } from 'react-native-ui-lib'

function InviteCodeScreen() {
  const { data: driver } = useDriverInfo()

  const { data: invitation } = useQuery({
    queryKey: ['invitation'],
    queryFn: () => serviceSpotsApi.getInviteCodeByServiceSpotId(driver!.serviceSpot.id),
    enabled: !!driver?.serviceSpot.id,
    staleTime: 0,
  })

  const expiration = useMemo(() => {
    if (!invitation) return null
    const now = moment()
    const expiresAt = moment().add(invitation.ttl, 'seconds')
    const diff = expiresAt.diff(now, 'seconds')
    const duration = moment.duration(diff, 'seconds')
    const minutes = duration.minutes()
    const seconds = duration.seconds()

    if (minutes === 0 && seconds === 0) return 'โค้ดเชิญนี้หมดอายุแล้ว'

    return `โค้ดเชิญนี้จะหมดอายุในอีก ${duration.humanize()}`
  }, [invitation])

  return (
    <View flex padding-20 gap-10 centerV>
      <Stack.Screen
        options={{
          title: 'สร้างโค้ดเชิญ',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'NotoSansThaiBold',
          },
        }}
      />
      <View center gap-10>
        <Text center>นำโค้ดให้สมาชิกเพื่อใช้ในการเข้าร่วมซุ้มวินมอเตอร์ไซค์รับจ้าง</Text>
      </View>
      <View row gap-20 center>
        <Text h1B>{invitation?.code}</Text>
      </View>
      <Text center>{expiration}</Text>
    </View>
  )
}

export default InviteCodeScreen
