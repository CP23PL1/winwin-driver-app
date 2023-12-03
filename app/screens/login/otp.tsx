import React from 'react'
import { View, Text, Button } from 'react-native-ui-lib';
import OTPTextInput from 'react-native-otp-textinput';

const OTP = ({ navigation }: { navigation: any }) => {
  return (
    <View flex paddingH-30 paddingT-120>
      <View center>
        <Text>กรอก <Text bodyB>รหัสผ่านชั่วคราว</Text></Text>
        <Text>ที่ส่งไปยังหมายเลข <Text bodyB>+66 12345678</Text></Text>
      </View>
      <View paddingV-30 paddingH-50>
        <OTPTextInput textInputStyle={{
          borderColor: 'black',
          borderWidth:1,
          borderRadius:5,
          borderBottomWidth:1,
        }}
        inputCount={4}
        tintColor={'#FBDAAB'}
        offTintColor={'#FBDAAB'}
        />
      </View>
      <View paddingV-15>
        <Button label={'ยืนยัน'} onPress={() => navigation.navigate('RegisterForm')}/>
      </View>
      <View center>
        <Text>ไม่ได้รับรหัสผ่านชั่วคราว? <Text underline>ส่งรหัสใหม่อีกครั้ง</Text></Text>
      </View>
    </View>
  )
}

export default OTP
