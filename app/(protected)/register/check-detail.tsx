import React, { useState } from 'react'
import { View, Text, Button, KeyboardAwareScrollView } from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'
import StepProgressBar from '../../../components/StepProgressBar'

const CheckDetail = () => {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)')
  }
  const prevStep = () => {
    router.push('/(protected)/register/upload-moto-pic')
  }
  return (
    <KeyboardAwareScrollView>
      <View flex paddingH-30 paddingT-20>
        <View paddingV-15>
          <View paddingV-20>
            <Text center h2B>
              ตรวจสอบข้อมูล
            </Text>
          </View>
          <View row center paddingB-20>
            <View flex height={1} backgroundColor={'#FDA84B'} />
          </View>
          <StepProgressBar step="five" />
          <View row center paddingV-30>
            <View flex paddingH-5>
              <Button secondary paddingV-15 label={'ย้อนกลับ'} onPress={prevStep} />
            </View>
            <View flex paddingH-5>
              <Button paddingV-15 label={'ยืนยัน'} onPress={nextStep} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default CheckDetail
