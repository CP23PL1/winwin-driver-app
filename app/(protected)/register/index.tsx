import React from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TextField, Button, KeyboardAwareScrollView } from 'react-native-ui-lib'
import StepProgressBar from '../../../components/StepProgressBar'

function Register() {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)/register/upload-id')
  }

  return (
    <KeyboardAwareScrollView>
      <View flex paddingH-30 paddingT-20>
        <View paddingV-15>
          <View paddingV-20>
            <Text center h2B>
              ข้อมูลส่วนตัว
            </Text>
          </View>
          <View row center paddingB-20>
            <View flex height={1} backgroundColor={'#FDA84B'} />
          </View>
          <StepProgressBar step="one" />
          <View paddingV-5>
            <View paddingV-5>
              <Text bodyB>ชื่อ</Text>
            </View>
            <TextField placeholder="ชื่อ" />
          </View>
          <View paddingV-5>
            <View paddingV-5>
              <Text bodyB>นามสกุล</Text>
            </View>
            <TextField placeholder="นามสกุล" />
          </View>
          <View paddingV-5>
            <View paddingV-5>
              <Text bodyB>วัน/เดือน/ปี เกิด</Text>
            </View>
            <TextField placeholder="วัน/เดือน/ปี เกิด" />
          </View>
          <View paddingV-5>
            <View paddingV-5>
              <Text bodyB>เลขบัตรประจำตัวประชาชน</Text>
            </View>
            <TextField placeholder="เลขบัตรประจำตัวประชาชน" />
          </View>
          <View row center paddingV-30>
            <View flex paddingH-5>
              <Button paddingV-15 label={'ถัดไป'} onPress={nextStep} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Register
