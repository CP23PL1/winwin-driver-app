import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import React, { createRef, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { View, Text, Button, Colors, MaskedInput } from 'react-native-ui-lib'
import * as yup from 'yup'
import InviteCodeMask from '../../../components/InviteCodeMask'

const schema = yup.object().shape({
  inviteCode: yup.string(),
})

const JoinServiceSpot = () => {
  const router = useRouter()

  const {
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const onPrev = () => {
    router.push('/(protected)')
  }

  const inviteCodeInput = createRef<TextInput>()

  return (
    <View centerV flex>
      <Text center h5B>
        กรุณากรอกโค๊ดเพื่อเข้าร่วมซุ้ม
      </Text>
      <View paddingH-20 paddingT-25>
        <Controller
          control={control}
          name="inviteCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedInput
              migrate
              ref={inviteCodeInput}
              renderMaskedText={(value: string) => <InviteCodeMask value={value} />}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              maxLength={6}
              autoFocus
            />
          )}
        />
      </View>
      <View row paddingH-20 paddingT-50>
        <View flex paddingH-5>
          <Button secondary onPress={() => onPrev()}>
            <Text bodyB white>
              ย้อนกลับ
            </Text>
          </Button>
        </View>
        <View flex paddingH-5>
          <Button>
            <Text bodyB white>
              ยืนยัน
            </Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default JoinServiceSpot
