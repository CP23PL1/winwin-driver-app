import React, { useMemo, useState } from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import OTPTextInput from 'react-native-otp-textinput'
import { useLoginWizardStore } from '../stores/login-wizard'
import { useAuth0 } from 'react-native-auth0'
import { useRouter } from 'expo-router'
import OtpPhoneSvg from '../assets/svgs/otp-phone.svg'
import { Alert } from 'react-native'

function Otp() {
  const router = useRouter()
  const { authorizeWithSMS, sendSMSCode } = useAuth0()
  const [code, onCodeChange] = useState('')
  const getPhoneNumberWithGeo = useLoginWizardStore((state) => state.getPhoneNumberWithGeo)
  const phoneNumberWithGeo = useMemo(() => getPhoneNumberWithGeo(), [getPhoneNumberWithGeo])

  if (!phoneNumberWithGeo) {
    return router.replace('/login')
  }

  const handleAuthorizeWithSMS = async () => {
    const credential = await authorizeWithSMS({
      phoneNumber: phoneNumberWithGeo,
      code,
      audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
    })

    if (!credential) {
      Alert.alert('รหัสผ่านชั่วคราวไม่ถูกต้อง')
      return
    }

    router.replace('/')
  }

  const handleResendOtp = async () => {
    await sendSMSCode({
      phoneNumber: phoneNumberWithGeo,
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
          ที่ส่งไปยังหมายเลข <Text bodyB>{phoneNumberWithGeo}</Text>
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
