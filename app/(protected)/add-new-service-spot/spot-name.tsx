import React, { useState } from 'react'
import { View, Text, TextField, Button } from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddSpotName = () => {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)/add-new-service-spot/upload-price')
  }
  const prevStep = () => {
    router.push('/(protected)/add-new-service-spot/')
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
        <View paddingV-5>
          <Text bodyB>ชื่อซุ้มวินมอเตอร์ไซค์รับจ้าง</Text>
        </View>
        <TextField placeholder="ชื่อซุ้มวินมอเตอร์ไซค์รับจ้าง" />
        <View paddingV-5>
          <Text bodyB>ชื่อหัวหน้าวินมอเตอร์ไซค์รับจ้าง</Text>
        </View>
        <TextField placeholder="ชื่อหัวหน้าวินมอเตอร์ไซค์รับจ้าง" />
        <View paddingV-5>
          <Text bodyB>เบอร์หัวหน้าวินมอเตอร์ไซค์รับจ้าง</Text>
        </View>
        <TextField placeholder="เบอร์หัวหน้าวินมอเตอร์ไซค์รับจ้าง" />
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
  )
}

export default AddSpotName
