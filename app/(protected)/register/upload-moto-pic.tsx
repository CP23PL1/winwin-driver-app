import React, { useState } from 'react'
import { View, Text, Button, KeyboardAwareScrollView } from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'
import UploadFileButton from '../../../components/UploadFileButton'
import StepProgressBar from '../../../components/StepProgressBar'

const UploadMotoPic = () => {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)/register/check-detail')
  }
  const prevStep = () => {
    router.push('/(protected)/register/moto-detail')
  }
  return (
    <KeyboardAwareScrollView>
      <View flex paddingH-30 paddingT-20>
        <View paddingV-15>
          <View paddingV-20>
            <Text center h2B>
              ข้อมูลยานพาหนะ
            </Text>
          </View>
          <View row center paddingB-20>
            <View flex height={1} backgroundColor={'#FDA84B'} />
          </View>
          <StepProgressBar step="four" />
          <View paddingV-10>
            <Text bodyB>
              ภาพถ่ายรถจักรยานยนต์ <Text red>*</Text>
            </Text>
            <Text color="gray">
              อัปโหลด{' '}
              <Text bodyB color="gray">
                ภาพถ่ายรถจักรยานยนต์
              </Text>{' '}
              ให้ชัดเจน
            </Text>
          </View>
          <View paddingV-15>
            <UploadFileButton />
          </View>
          <View row center paddingV-15>
            <View flex paddingH-5>
              <Button secondary paddingV-15 label={'ย้อนกลับ'} onPress={prevStep} />
            </View>
            <View flex paddingH-5>
              <Button paddingV-15 label={'ถัดไป'} onPress={nextStep} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default UploadMotoPic
