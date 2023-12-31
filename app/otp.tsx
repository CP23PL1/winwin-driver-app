import React, { useMemo, useState } from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import OTPTextInput from 'react-native-otp-textinput'
import { useLoginWizardStore } from '../stores/login-wizard'
import { useAuth0 } from 'react-native-auth0'
import { useRouter } from 'expo-router'
import OtpPhoneSvg from '../assets/svgs/otp-phone.svg'

function Otp() {
  const { authorizeWithSMS } = useAuth0()
  const router = useRouter()
  const [code, onCodeChange] = useState('')
  const getPhoneNumberWithGeo = useLoginWizardStore((state) => state.getPhoneNumberWithGeo)
  const phoneNumberWithGeo = useMemo(() => getPhoneNumberWithGeo(), [getPhoneNumberWithGeo])

  if (!phoneNumberWithGeo) {
    return router.replace('/login')
  }

  const handleAuthorizeWithSMS = async () => {
    try {
      await authorizeWithSMS({
        phoneNumber: phoneNumberWithGeo,
        code,
        audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      })
      router.replace('/')
    } catch (error) {
      console.error(error)
    }
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
          ไม่ได้รับรหัสผ่านชั่วคราว? <Text underline>ส่งรหัสใหม่อีกครั้ง</Text>
        </Text>
      </View>
    </View>
  )
}

export default Otp
