import { createRef, useCallback, useMemo } from 'react'
import * as yup from 'yup'
import { View, Text, Button, MaskedInput, LoaderScreen } from 'react-native-ui-lib'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useLoginWizardStore } from '../stores/login-wizard'
import { Redirect, useRouter } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { TextInput } from 'react-native-gesture-handler'
import PhoneNumberMask from '../components/PhoneNumberMask'
import LoginPhoneSvg from '../assets/svgs/login-phone.svg'

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(\d{9})$/, 'หมายเลขโทรศัพท์มือถือไม่ถูกต้อง')
    .required('กรุณากรอกหมายเลขโทรศัพท์มือถือ')
    .min(9)
    .max(9)
    .trim(),
})

function Login() {
  const { user, isLoading, sendSMSCode } = useAuth0()
  const router = useRouter()
  const getPhoneNumberWithGeo = useLoginWizardStore((state) => state.getPhoneNumberWithGeo)
  const setPhoneNumber = useLoginWizardStore((state) => state.setPhoneNumber)
  const {
    formState: { isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const shouldSubmitBtnDisabled = useMemo(() => !isValid || isSubmitting, [isValid, isSubmitting])

  const phoneNumberInput = createRef<TextInput>()

  const onSubmit = handleSubmit(async (data) => {
    setPhoneNumber(data.phoneNumber)
    const phoneNumberWithGeo = getPhoneNumberWithGeo()
    await sendSMSCode({
      phoneNumber: phoneNumberWithGeo!,
    })
    router.push('/otp')
  })

  if (isLoading) {
    return <LoaderScreen />
  }

  if (user) {
    return <Redirect href="/" />
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
              keyboardType="numeric"
              autoFocus
            />
          )}
        />
      </View>
      <Button label="รับรหัสผ่านชั่วคราว" onPress={onSubmit} disabled={shouldSubmitBtnDisabled} />
    </View>
  )
}

export default Login
