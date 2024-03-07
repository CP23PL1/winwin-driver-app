import { createRef, useMemo } from 'react'
import * as yup from 'yup'
import { View, Text, Button, MaskedInput, LoaderScreen } from 'react-native-ui-lib'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Redirect, useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { TextInput } from 'react-native-gesture-handler'
import PhoneNumberMask from '../components/PhoneNumberMask'
import LoginPhoneSvg from '../assets/svgs/login-phone.svg'
import { THAI_DIAL_CODE, THAI_PHONE_NUMBER_LENGTH } from '../constants/phone'
import loginWizardStore from '../stores/login-wizard'
import { driversApi } from '../apis/drivers'
import { Alert } from 'react-native'

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(\d{9})$/, 'หมายเลขโทรศัพท์มือถือไม่ถูกต้อง')
    .required('กรุณากรอกหมายเลขโทรศัพท์มือถือ')
    .min(THAI_PHONE_NUMBER_LENGTH)
    .max(THAI_PHONE_NUMBER_LENGTH)
    .trim(),
})

function Login() {
  const { isLoading, sendSMSCode } = useAuth0()
  const router = useRouter()

  const {
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: loginWizardStore.get.phoneNumber(),
    },
  })

  const shouldSubmitBtnDisabled = useMemo(() => !isValid || isSubmitting, [isValid, isSubmitting])

  const phoneNumberInput = createRef<TextInput>()

  const onSubmit = handleSubmit(async (data) => {
    const formattedPhoneNumber = `${THAI_DIAL_CODE}${data.phoneNumber}`
    loginWizardStore.set.phoneNumber(formattedPhoneNumber)

    const valid = await driversApi.verifyDriverIdentity(formattedPhoneNumber)

    if (!valid) {
      Alert.alert('ไม่พบหมายเลขโทรศัพท์มือถือนี้ในระบบคนขับ')
      return
    }

    await sendSMSCode({
      phoneNumber: formattedPhoneNumber,
    })
    router.push('/otp')
  })

  if (isLoading) {
    return <LoaderScreen />
  }

  return (
    <View centerV height="100%" padding-25 gap-25>
      <View center>
        <LoginPhoneSvg />
      </View>
      <View center>
        <Text>กรอกหมายเลขโทรศัพท์มือถือ</Text>
        <Text>
          เพื่อรับ <Text bodyB>รหัสผ่านชั่วคราว</Text>
        </Text>
      </View>
      <View padding-5>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedInput
              migrate
              ref={phoneNumberInput}
              renderMaskedText={(value: string) => <PhoneNumberMask value={value} dialCode="+66" />}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              maxLength={THAI_PHONE_NUMBER_LENGTH}
              keyboardType="numeric"
              autoFocus
            />
          )}
        />
        <Text aria-hidden={!!errors.phoneNumber?.message}>{errors.phoneNumber?.message}</Text>
      </View>
      <Button label="รับรหัสผ่านชั่วคราว" onPress={onSubmit} disabled={shouldSubmitBtnDisabled} />
    </View>
  )
}

export default Login
