import React from 'react'
import { View, Text, TextField, Button } from 'react-native-ui-lib';

const PhoneNumber = ({ navigation }: { navigation: any }) => {
  return (
    <View flex paddingH-30 paddingT-120>
      <View center paddingV-50>
        <Text>กรอกหมายเลขโทรศัพท์มือถือ</Text>
        <Text>เพื่อรับ <Text bodyB>รหัสผ่านชั่วคราว</Text></Text>
      </View>
      <View paddingV-30>
        <TextField placeholder="หมายเลขโทรศัพท์"/>
      </View>
      <Button label={'รับรหัสผ่านชั่วคราว'} onPress={() => navigation.navigate('OTP')}/>
    </View>
  )
}

export default PhoneNumber
