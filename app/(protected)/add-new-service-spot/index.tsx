import React, { useState, createRef, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  TextField,
  Button,
  Colors,
  KeyboardAwareScrollView,
  MaskedInput,
} from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'
import UploadFileButton from '../../../components/UploadFileButton'
import SuccessOrFail from '../../../components/SuccessOrFail'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextInput } from 'react-native-gesture-handler'
import { MIN_SPOT_NAME_LENGTH, MAX_SPOT_NAME_LENGTH, MAX_ADDRESS_LENGTH } from '../../../constants/addNewServiceSpot'

const schema = yup.object().shape({
  address: yup.string().required('กรุณากรอกที่อยู่ให้ครบถ้วน').max(MAX_ADDRESS_LENGTH, 'ที่อยู่ต้องมีความยาวไม่เกิน 100 ตัวอักษร'),
  subDistrict: yup.string().required('กรุณากรอกที่อยู่ให้ครบถ้วน'),
  district: yup.string().required('กรุณากรอกที่อยู่ให้ครบถ้วน'),
  province: yup.string().required('กรุณากรอกที่อยู่ให้ครบถ้วน'),
  spotName: yup
    .string()
    .required('กรุณากรอกที่อยู่ให้ครบถ้วน')
    .min(MIN_SPOT_NAME_LENGTH, 'ชื่อซุ้มวินมอเตอร์ไซค์รับจ้างต้องมีความยาวอย่างน้อย 3 ตัวอักษร')
    .max(MAX_SPOT_NAME_LENGTH, 'ชื่อซุ้มวินมอเตอร์ไซค์รับจ้างต้องมีความยาวไม่เกิน 50 ตัวอักษร'),
})

const AddAddress = () => {
  const router = useRouter()
  const nextStep = () => {
    router.push('/(protected)/add-new-service-spot/confirm')
  }
  const prevStep = () => {
    router.push('/(protected)')
  }
  
  const {
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: '',
      subDistrict: '',
      district: '',
      province: '',
      spotName: '',
    },
  })

  const shouldSubmitBtnDisabled = useMemo(
    () => !isValid || isSubmitting,
    [isValid, isSubmitting],
  )

  const addressInput = createRef<TextInput>()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  })

  return (
    <KeyboardAwareScrollView>
      <View flex paddingH-30 paddingT-30>
        <View paddingV-20>
          <Text center h3B>
            เพิ่มซุ้มวินมอเตอร์ไซค์รับจ้าง
          </Text>
        </View>
        <View row center paddingB-20>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              ชื่อซุ้มวินมอเตอร์ไซค์รับจ้าง <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="spotName"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="ชื่อซุ้มวินมอเตอร์ไซค์รับจ้าง"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.spotName && <Text color="red">{errors.spotName.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              จังหวัด <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="province"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField placeholder="จังหวัด" value={value} onChangeText={onChange} />
            )}
          />
          {errors.province && <Text color="red">{errors.province.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              เขต/อำเภอ <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="district"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField placeholder="เขต/อำเภอ" value={value} onChangeText={onChange} />
            )}
          />
          {errors.district && <Text color="red">{errors.district.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              แขวง <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="subDistrict"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField placeholder="แขวง" value={value} onChangeText={onChange} />
            )}
          />
          {errors.address && <Text color="red">{errors.address.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              บ้านเลขที่ หมู่ ซอย ถนน<Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="address"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="บ้านเลขที่ หมู่ ซอย ถนน"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.address && <Text color="red">{errors.address.message}</Text>}
        </View>

        <View paddingV-10>
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
        </View>
        <View paddingV-15>
          <UploadFileButton />
        </View>
        <View row center paddingV-30>
          <View flex paddingH-5>
            <Button secondary paddingV-15 label={'ย้อนกลับ'} onPress={prevStep} />
          </View>
          <View flex paddingH-5>
            <Button paddingV-15 label={'ยืนยัน'} onPress={onSubmit} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default AddAddress
