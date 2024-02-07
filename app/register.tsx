import { useRouter } from 'expo-router'
import React from 'react'
import { Button, View, Text, KeyboardAwareScrollView, TextField } from 'react-native-ui-lib'
function Register() {
  const router = useRouter()

  return (
    <View flex centerV padding-25>
      <View paddingV-15>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>เลขบัตรประชาชน 13 หลัก</Text>
          </View>
          <TextField keyboardType={'number-pad'} maxLength={13} placeholder="เลขบัตรประชาชน 13 หลัก" />
        </View>
      </View>
      <View paddingV-30>
        <View paddingH-5>
          <Button paddingV-15 label={'ถัดไป'} onPress={() => router.push('/login')} />
        </View>
      </View>
    </View>
  )
}

export default Register
