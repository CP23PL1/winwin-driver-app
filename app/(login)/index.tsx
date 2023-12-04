import React, { useCallback } from 'react'
import * as yup from 'yup'
import { View, Text, TextField, Button } from 'react-native-ui-lib'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

const loginSchema = yup.object().shape({
  phoneNumber: yup.string().required('กรุณากรอกหมายเลขโทรศัพท์มือถือ'),
})

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <View flex paddingH-30 paddingT-120>
      <View center paddingV-50>
        <Text>กรอกหมายเลขโทรศัพท์มือถือ</Text>
        <Text>
          เพื่อรับ <Text bodyB>รหัสผ่านชั่วคราว</Text>
        </Text>
      </View>
      <View paddingV-30>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              placeholder="หมายเลขโทรศัพท์"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>
      <Button label="รับรหัสผ่านชั่วคราว" onPress={onSubmit} />
    </View>
  )
}

export default Login
