import React, { useMemo, useState } from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import OTPTextInput from 'react-native-otp-textinput'
import { useAuth0 } from 'react-native-auth0'
import { useLocalSearchParams, useRouter } from 'expo-router'
import OtpPhoneSvg from 'assets/svgs/otp-phone.svg'
import { Alert } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'
import { DRIVER_INFO_QUERY_KEY } from '@/hooks/useDriverInfo'

type Params = {
  phoneNumber: string
}

function Otp() {
  const searchParams = useLocalSearchParams<Params>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { authorizeWithSMS, sendSMSCode } = useAuth0()
  const [code, onCodeChange] = useState('')

  const phoneNumber = useMemo(() => {
    if (!searchParams.phoneNumber) {
      return null
    }
    return decodeURIComponent(searchParams.phoneNumber)
  }, [searchParams.phoneNumber])

  if (!phoneNumber) {
    return router.replace('/login')
  }

  const handleAuthorizeWithSMS = async () => {
    try {
      const credentials = await authorizeWithSMS({
        phoneNumber,
        code,
        audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
        scope: process.env.EXPO_PUBLIC_AUTH0_SCOPE,
      })
      if (!credentials) {
        throw new Error('Failed to authorize with SMS')
      }
      await queryClient.invalidateQueries({
        queryKey: DRIVER_INFO_QUERY_KEY,
        type: 'all',
      })
      router.replace('/(protected)/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleResendOtp = async () => {
    await sendSMSCode({
      phoneNumber,
      send: 'code',
    })
    Alert.alert('ส่งรหัสผ่านชั่วคราวใหม่เรียบร้อยแล้ว')
  }

  return (
    <View centerV paddingH-25 gap-25 height="100%">
      <View center>
        <OtpPhoneSvg />
      </View>
      <View center>
        <Text>
          กรอก <Text bodyB>รหัสผ่านชั่วคราว</Text>
        </Text>
        <Text>
          ที่ส่งไปยังหมายเลข <Text bodyB>{phoneNumber}</Text>
        </Text>
      </View>
      <View paddingV-30 center>
        <OTPTextInput
          textInputStyle={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            borderBottomWidth: 1,
          }}
          handleTextChange={onCodeChange}
          inputCount={4}
          tintColor={'#FBDAAB'}
          offTintColor={'#FBDAAB'}
        />
      </View>
      <View paddingV-15>
        <Button label={'ยืนยัน'} onPress={handleAuthorizeWithSMS} />
      </View>
      <View center>
        <Text>
          ไม่ได้รับรหัสผ่านชั่วคราว?{' '}
          <Text underline onPress={handleResendOtp}>
            ส่งรหัสใหม่อีกครั้ง
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default Otp
