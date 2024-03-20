import React, { useCallback } from 'react'
import { Button, Text } from 'react-native-ui-lib'
import DeviconGoogle from 'assets/svgs/devicon_google.svg'
import { Link } from 'expo-router'
import { Alert, Linking } from 'react-native'
import { Coordinate } from '@/apis/shared/type'

type Props = {
  location: Coordinate
}

export default function GoogleNavigationBtn({ location }: Props) {
  const openRouteViewInMapApplication = useCallback(async () => {
    const searchParams = new URLSearchParams()
    searchParams.append('api', '1')
    searchParams.append('destination', `${location.lat},${location.lng}`)
    const url = `https://www.google.com/maps/dir/?${searchParams.toString()}`
    const supported = await Linking.canOpenURL(url)

    if (!supported) {
      Alert.alert('ไม่สามารถเปิดแผนที่ได้')
      return
    }

    await Linking.openURL(url)
  }, [location])

  return (
    <Button style={{ backgroundColor: '#8AAFEE80' }} onPress={openRouteViewInMapApplication}>
      <DeviconGoogle />
      <Text style={{ color: '#587DBD' }}>เส้นทาง</Text>
    </Button>
  )
}
