import React, { useState } from 'react'
import { View, Text, Button, TextField, KeyboardAwareScrollView } from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'
import StepProgressBar from '../../../components/StepProgressBar'

const MotoDetail = () => {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)/register/upload-moto-pic')
  }
  const prevStep = () => {
    router.push('/(protected)/register/upload-id')
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
          <StepProgressBar step="three" />
          <View paddingV-5>
            <View paddingV-5>
              <Text bodyB>รุ่น</Text>
            </View>
            <TextField placeholder="รุ่น" />
          </View>
          <View paddingV-5>
            <View paddingV-5>
              <Text bodyB>ยี่ห้อ</Text>
            </View>
            <TextField placeholder="ยี่ห้อ" />
          </View>
          <View paddingV-5>
            <View paddingV-5>
              <Text bodyB>ป้ายทะเบียน</Text>
            </View>
            <TextField placeholder="ป้ายทะเบียน" />
          </View>
          <View row center paddingV-30>
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

export default MotoDetail
