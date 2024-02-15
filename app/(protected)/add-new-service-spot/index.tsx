import React, { useRef } from 'react'
import { View, Text, TextField, Button, Colors, KeyboardAwareScrollView } from 'react-native-ui-lib'
import { useRouter } from 'expo-router'
import UploadFileButton from '../../../components/UploadFileButton'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectDropdown, { SelectDropdownRef } from '../../../components/SelectDropdown'
import * as yup from 'yup'
import {
  MIN_SPOT_NAME_LENGTH,
  MAX_SPOT_NAME_LENGTH,
  MAX_ADDRESS_LENGTH,
} from '../../../constants/addNewServiceSpot'
import { useAddressOptions } from '../../../hooks/useAddresses'
import { commonUtil } from '../../../utils/common'

const schema = yup.object().shape({
  addressLine1: yup
    .string()
    .required('กรุณากรอกข้อมูลให้ครบถ้วน')
    .max(MAX_ADDRESS_LENGTH, 'ที่อยู่ต้องมีความยาวไม่เกิน 100 ตัวอักษร'),
  addressLine2: yup
    .string()
    .max(MAX_ADDRESS_LENGTH, 'ที่อยู่ต้องมีความยาวไม่เกิน 100 ตัวอักษร')
    .optional(),
  subDistrictId: yup.number().required('กรุณากรอกข้อมูลให้ครบถ้วน'),
  districtId: yup.number().required('กรุณากรอกข้อมูลให้ครบถ้วน'),
  provinceId: yup.number().required('กรุณากรอกข้อมูลให้ครบถ้วน'),
  serviceSpotName: yup
    .string()
    .required('กรุณากรอกข้อมูลให้ครบถ้วน')
    .min(
      MIN_SPOT_NAME_LENGTH,
      'ชื่อซุ้มวินมอเตอร์ไซค์รับจ้างต้องมีความยาวอย่างน้อย ' + MIN_SPOT_NAME_LENGTH + ' ตัวอักษร',
    )
    .max(
      MAX_SPOT_NAME_LENGTH,
      'ชื่อซุ้มวินมอเตอร์ไซค์รับจ้างต้องมีความยาวไม่เกิน ' + MAX_SPOT_NAME_LENGTH + ' ตัวอักษร',
    ),
  priceRateImageUri: yup.string().required('กรุณาอัปโหลดภาพถ่ายป้ายอัตราค่าโดยสาร'),
})

const AddAddress = () => {
  const router = useRouter()

  const districtDropdownRef = useRef<SelectDropdownRef>(null)
  const subDistrictDropdownRef = useRef<SelectDropdownRef>(null)

  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      addressLine1: '',
      serviceSpotName: '',
    },
  })

  const provinceId = watch('provinceId')
  const districtId = watch('districtId')

  const { provinces, districts, subDistricts } = useAddressOptions({
    provinceId,
    districtId,
  })

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data)
    // router.push('/(protected)/add-new-service-spot/confirm')
    const priceRateImage = await commonUtil.getBlobFromUri(data.priceRateImageUri)
    console.log(priceRateImage)
    console.log('onSubmit', data)
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
            name="serviceSpotName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField value={value} onChangeText={onChange} />
            )}
          />
          {errors.serviceSpotName && <Text red>{errors.serviceSpotName.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              จังหวัด <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="provinceId"
            render={({ field: { onChange } }) => (
              <SelectDropdown
                data={provinces!}
                defaultButtonText="เลือกจังหวัด"
                buttonTextAfterSelection={(selectedItem) => selectedItem.nameTH}
                rowTextForSelection={(selectedItem) => selectedItem.nameTH}
                buttonStyle={{ backgroundColor: Colors.white }}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id)
                  resetField('districtId')
                  districtDropdownRef.current?.reset()
                  resetField('subDistrictId')
                  subDistrictDropdownRef.current?.reset()
                }}
              />
            )}
          />
          {errors.provinceId && <Text red>{errors.provinceId.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              เขต/อำเภอ <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="districtId"
            render={({ field: { onChange } }) => (
              <SelectDropdown
                data={districts!}
                ref={districtDropdownRef}
                defaultButtonText="เลือกเขต/อำเภอ"
                buttonTextAfterSelection={(selectedItem) => selectedItem.nameTH}
                rowTextForSelection={(selectedItem) => selectedItem.nameTH}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id)
                  resetField('subDistrictId')
                  subDistrictDropdownRef.current?.reset()
                }}
                disabled={!getValues('provinceId')}
              />
            )}
          />
          {errors.districtId && <Text red>{errors.districtId.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              แขวง <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="subDistrictId"
            render={({ field: { onChange } }) => (
              <SelectDropdown
                data={subDistricts!}
                ref={subDistrictDropdownRef}
                defaultButtonText="เลือกแขวง/ตำบล"
                buttonTextAfterSelection={(selectedItem) => selectedItem.nameTH}
                rowTextForSelection={(selectedItem) => selectedItem.nameTH}
                onSelect={(selectedItem) => onChange(selectedItem.id)}
                disabled={!getValues('districtId')}
              />
            )}
          />
          {errors.subDistrictId && <Text red>{errors.subDistrictId.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              บ้านเลขที่ หมู่ ซอย ถนน<Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="addressLine1"
            render={({ field: { onChange, value } }) => (
              <TextField value={value} onChangeText={onChange} />
            )}
          />
          {errors.addressLine1 && <Text red>{errors.addressLine1.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>ที่อยู่ (เพิ่มเติม)</Text>
          </View>
          <Controller
            control={control}
            name="addressLine2"
            render={({ field: { onChange, value } }) => (
              <TextField value={value} onChangeText={onChange} />
            )}
          />
          {errors.addressLine2 && <Text red>{errors.addressLine2.message}</Text>}
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
          <Controller
            control={control}
            name="priceRateImageUri"
            render={({ field: { onChange } }) => (
              <UploadFileButton
                onUpload={(file) => {
                  onChange(file.uri)
                }}
              />
            )}
          />
        </View>
        <View row center paddingV-30>
          <View flex paddingH-5>
            <Button secondary paddingV-15 label={'ย้อนกลับ'} onPress={router.back} />
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
