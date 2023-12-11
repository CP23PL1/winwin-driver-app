import React, { useState } from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'
import UploadFileButton from '../../../components/UploadFileButton'

const UploadPrice = () => {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)/add-new-service-spot/upload-price')
  }
  const prevStep = () => {
    router.push('/(protected)/add-new-service-spot/spot-name')
  }
  return (
    <View flex paddingH-30 paddingT-20>
      <View paddingV-15>
        <View paddingV-20>
          <Text center h2B>
            เพิ่มซุ้มวินมอเตอร์ไซค์รับจ้าง
          </Text>
        </View>
        <View row center paddingB-20>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <Text bodyB>
          ภาพถ่ายป้ายอัตราค่าโดยสาร <Text red>*</Text>
        </Text>
        <Text color="gray">
          อัปโหลด{' '}
          <Text bodyB color="gray">
            ภาพถ่ายป้ายอัตราค่าโดยสาร
          </Text>{' '}
          ให้ชัดเจน
        </Text>
        <View paddingV-15>
          <UploadFileButton />
        </View>
        <View row center paddingV-15>
          <View flex paddingH-5>
            <Button secondary paddingV-15 label={'ย้อนกลับ'} onPress={prevStep} />
          </View>
          <View flex paddingH-5>
            <Button paddingV-15 label={'ยืนยัน'} onPress={nextStep} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default UploadPrice
