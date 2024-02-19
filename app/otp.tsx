import React, { useState } from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import OTPTextInput from 'react-native-otp-textinput'
import { useAuth0 } from 'react-native-auth0'
import { useRouter } from 'expo-router'
import OtpPhoneSvg from '../assets/svgs/otp-phone.svg'
import { Alert } from 'react-native'
import loginWizardStore from '../stores/login-wizard'
import { useQueryClient } from 'react-query'

function Otp() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { authorizeWithSMS, sendSMSCode } = useAuth0()
  const [code, onCodeChange] = useState('')
  const phoneNumber = loginWizardStore.get.phoneNumber()

  if (!phoneNumber) {
    return router.replace('/login')
  }

  const handleAuthorizeWithSMS = async () => {
    try {
      await authorizeWithSMS({
        phoneNumber,
        code,
        audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      })
      await queryClient.invalidateQueries(['driver-info'])
      router.replace('/(protected)/')
    } catch (error) {
      console.error(error)
    }

    router.replace('/')
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
