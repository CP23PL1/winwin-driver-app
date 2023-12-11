import React, { useState } from 'react'
import { View, Text, TextField, Button } from 'react-native-ui-lib'

const RegisterForm = () => {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((prevStep) => prevStep + 1)
  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1)
    }
  }
  const handleSubmission = () => {
    alert('Succesful')
  }

  return (
    <View flex paddingH-30 paddingT-20>
      {step === 1 && (
        <View paddingV-15>
          <View paddingB-20>
            <Text center h1B>
              ข้อมูลส่วนตัว
            </Text>
          </View>
          <Text bodyB>ชื่อ</Text>
          <TextField placeholder="ชื่อ" />
          <Text bodyB>นามสกุล</Text>
          <TextField placeholder="นามสกุล" />
          <Text bodyB>วัน/เดือน/ปี เกิด</Text>
          <TextField placeholder="วัน/เดือน/ปี เกิด" />
          <Text bodyB>เลขบัตรประจำตัวประชาชน</Text>
          <TextField placeholder="เลขบัตรประจำตัวประชาชน" />
          <View paddingV-15>
            <Button label={'ถัดไป'} onPress={nextStep} />
          </View>
        </View>
      )}

      {step === 2 && (
        <View paddingV-15>
          <View paddingB-20>
            <Text center h1B>
              ข้อมูลส่วนตัว
            </Text>
          </View>
          <Text bodyB>
            บัตรประจำตัวประชาชน <Text red>*</Text>
          </Text>
          <Text>
            อัปโหลด <Text bodyB>บัตรประจำตัวประชาชน</Text> ให้ชัดเจน
          </Text>
          <Button label="อัปโหลด บัตรประจำตัวประชาชน" />
          <Text bodyB>
            ใบขับขี่รถจักรยานยนต์สาธารณะ <Text red>*</Text>
          </Text>
          <Text>
            อัปโหลด <Text bodyB>ใบขับขี่รถจักรยานยนต์สาธารณะ</Text> ให้ชัดเจน
          </Text>
          <Button label="อัปโหลด ใบขับขี่รถจักรยานยนต์สาธารณะ" />
          <View row center paddingV-15 paddingH-25>
            <View paddingH-5>
              <Button secondary label={'ย้อนกลับ'} onPress={prevStep} />
            </View>
            <View paddingH-5>
              <Button label={'ถัดไป'} onPress={nextStep} />
            </View>
          </View>
        </View>
      )}

      {step === 3 && (
        <View>
          <View paddingB-20>
            <Text center h1B>
              ข้อมูลยานพาหนะ
            </Text>
          </View>
          <Text bodyB>รุ่น</Text>
          <TextField placeholder="รุ่น" />
          <Text bodyB>ยี่ห้อ</Text>
          <TextField placeholder="ยี่ห้อ" />
          <Text bodyB>ป้ายทะเบียน</Text>
          <TextField placeholder="ป้ายทะเบียน" />
          <View row center paddingV-15 paddingH-25>
            <View paddingH-5>
              <Button secondary label={'ย้อนกลับ'} onPress={prevStep} />
            </View>
            <View paddingH-5>
              <Button label={'ถัดไป'} onPress={nextStep} />
            </View>
          </View>
        </View>
      )}

      {step === 4 && (
        <View>
          <View paddingB-20>
            <Text center h1B>
              ข้อมูลยานพาหนะ
            </Text>
          </View>
          <Text bodyB>
            ภาพถ่ายรถจักรยานยนต์ <Text red>*</Text>
          </Text>
          <Text>
            อัปโหลด <Text bodyB>ภาพถ่ายรถจักรยานยนต์</Text> ให้ชัดเจน
          </Text>
          <Button label="อัปโหลด ภาพถ่ายรถจักรยานยนต์" />
          <View row center paddingV-15 paddingH-25>
            <View paddingH-5>
              <Button secondary label={'ย้อนกลับ'} onPress={prevStep} />
            </View>
            <View paddingH-5>
              <Button label={'ถัดไป'} onPress={nextStep} />
            </View>
          </View>
        </View>
      )}

      {step === 5 && (
        <View>
          <View paddingB-20>
            <Text center h1B>
              ตรวจสอบข้อมูล
            </Text>
          </View>
          <Text bodyB>ชื่อ-นามสกุล : </Text>
          <Text bodyB>วัน/เดือน/ปี เกิด : </Text>
          <Text bodyB>เลขบัตรประจำตัวประชาชน : </Text>
          <Text bodyB>บัตรประจำตัวประชาชน : </Text>
          <Text bodyB>ใบขับขี่รถจักรยานยนต์สาธารณะ : </Text>
          <Text bodyB>รุ่น : </Text>
          <Text bodyB>ยี่ห้อ : </Text>
          <Text bodyB>ป้ายทะเบียน : </Text>
          <View row center paddingV-15 paddingH-25>
            <View paddingH-5>
              <Button secondary label={'ย้อนกลับ'} onPress={prevStep} />
            </View>
            <View paddingH-5>
              <Button label={'ยืนยัน'} onPress={handleSubmission} />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default RegisterForm
