import React, { useState } from 'react'
import { View, Text, TextField, Button, Colors } from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'

const AddAddress = () => {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)/add-new-service-spot/spot-name')
  }
  const prevStep = () => {
    return <Redirect href="/login" />
  }
  return (
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
        <Text bodyB>บ้านเลขที่ ซอย หมู่ ถนน แขวง</Text>
      </View>
      <TextField placeholder="บ้านเลขที่ ซอย หมู่ ถนน แขวง" />
      <View paddingV-5>
        <Text bodyB>เขต/อำเภอ</Text>
      </View>
      <TextField placeholder="เขต/อำเภอ" />
      <View paddingV-5>
        <Text bodyB>จังหวัด</Text>
      </View>
      <TextField placeholder="จังหวัด" />
      <View row center paddingV-30>
        <View flex paddingH-5>
          <Button secondary paddingV-15 label={'ย้อนกลับ'} onPress={prevStep} />
        </View>
        <View flex paddingH-5>
          <Button paddingV-15 label={'ถัดไป'} onPress={nextStep} />
        </View>
      </View>
    </View>
  )
}

export default AddAddress
