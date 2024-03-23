import React, { useEffect, useMemo, useRef } from 'react'
import {
  View,
  Text,
  TextField,
  Button,
  Colors,
  KeyboardAwareScrollView,
  TouchableOpacity,
} from 'react-native-ui-lib'
import { useRouter, usePathname, useLocalSearchParams } from 'expo-router'
import UploadFileButton from '@/components/UploadFileButton'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectDropdown, { SelectDropdownRef } from '@/components/SelectDropdown'
import * as yup from 'yup'
import {
  MIN_SPOT_NAME_LENGTH,
  MAX_SPOT_NAME_LENGTH,
  MAX_ADDRESS_LENGTH,
} from '@/constants/addNewServiceSpot'
import { useAddressOptions } from '@/hooks/useAddressOptions'
import { ImagePickerAsset } from 'expo-image-picker'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serviceSpotsApi } from '@/apis/service-spots'
import { Fontisto } from '@expo/vector-icons'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { Alert, StyleSheet, ToastAndroid } from 'react-native'
import { driversApi } from '@/apis/drivers'
import { Coordinate } from '@/apis/service-spots/type'

type Params = {
  region: string
}

const schema = yup.object().shape({
  coords: yup.mixed<Coordinate>().required('กรุณาระบุตำแหน่งบนแผนที่'),
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
      `ชื่อซุ้มวินมอเตอร์ไซค์รับจ้างต้องมีความยาวอย่างน้อย ${MIN_SPOT_NAME_LENGTH} ตัวอักษร`,
    )
    .max(
      MAX_SPOT_NAME_LENGTH,
      `ชื่อซุ้มวินมอเตอร์ไซค์รับจ้างต้องมีความยาวไม่เกิน ${MAX_SPOT_NAME_LENGTH} ตัวอักษร`,
    ),
  priceRateImage: yup.mixed<ImagePickerAsset>().required('กรุณาอัปโหลดภาพถ่ายป้ายอัตราค่าโดยสาร'),
})

const AddAddress = () => {
  const { region } = useLocalSearchParams() as Params
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const router = useRouter()
  const parsedRegion = useMemo(() => (region ? (JSON.parse(region) as Region) : null), [region])

  const { data: driverInfo } = useQuery({
    queryKey: ['driver-info'],
    queryFn: driversApi.getMyDriverInfo,
  })

  const districtDropdownRef = useRef<SelectDropdownRef>(null)
  const subDistrictDropdownRef = useRef<SelectDropdownRef>(null)

  const { mutate: createServiceSpot } = useMutation({
    mutationFn: serviceSpotsApi.createServiceSpot,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['driver-info'],
      })
      ToastAndroid.show('เพิ่มซุ้มวินมอเตอร์ไซค์รับจ้างเรียบร้อยแล้ว', ToastAndroid.SHORT)
      router.replace('/(protected)/')
    },
    onError: (error) => {
      // @ts-ignore
      Alert.alert('เกิดข้อผิดพลาด', error.response.data.message)
    },
  })

  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    watch,
    getValues,
    setValue,
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

  const {
    provinces,
    districts,
    subDistricts,
    fetchNextProvinces,
    fetchNextDistricts,
    fetchNextSubDistricts,
  } = useAddressOptions({
    provinceId,
    districtId,
  })

  const onSubmit = handleSubmit(async (data) => {
    createServiceSpot({
      name: data.serviceSpotName,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      subDistrictId: data.subDistrictId,
      coords: data.coords,
      serviceSpotOwnerId: driverInfo!.id,
      priceRateImage: {
        uri: data.priceRateImage.uri,
        type: 'image/jpeg',
        name: 'priceRateImage.jpg',
      },
    })
  })

  const openMapPicker = () => {
    router.push(`/(protected)/map?callback=${pathname}`)
  }

  useEffect(() => {
    if (!parsedRegion) return
    setValue('coords', {
      lat: parsedRegion.latitude,
      lng: parsedRegion.longitude,
    })
  }, [parsedRegion])

  return (
    <KeyboardAwareScrollView>
      <View flex paddingH-30 paddingT-30>
        <View paddingV-20>
          <Text center h3B>
            เพิ่มซุ้มวินมอเตอร์ไซค์รับจ้าง
          </Text>
        </View>
        <View flex height={1} backgroundColor={'#FDA84B'} />
        <View paddingV-10>
          <Text bodyB>
            ระบุตำแหน่งซุ้มบนแผนที่ <Text red>*</Text>
          </Text>
        </View>
        {parsedRegion ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            region={parsedRegion}
            style={styles.map}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
          >
            <Marker coordinate={parsedRegion} />
          </MapView>
        ) : (
          <TouchableOpacity style={styles.mapCard} onPress={openMapPicker}>
            <View center paddingV-5>
              <Fontisto name="map-marker-alt" size={32} color="orange" />
            </View>
            <Text bodyB center color="gray">
              ระบุตำแหน่งบนแผนที่
            </Text>
          </TouchableOpacity>
        )}
        {errors.coords && <Text red>{errors.coords.message}</Text>}
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              ชื่อซุ้มวินมอเตอร์ไซค์รับจ้าง <Text red>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            name="serviceSpotName"
            render={({ field: { onChange, value } }) => (
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
                rowTextForSelection={(selectedItem) => selectedItem.nameTH}
                buttonTextAfterSelection={(selectedItem) => selectedItem.nameTH}
                buttonStyle={{ backgroundColor: Colors.white }}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id)
                  resetField('districtId')
                  districtDropdownRef.current?.reset()
                  resetField('subDistrictId')
                  subDistrictDropdownRef.current?.reset()
                }}
                onScrollEndReached={fetchNextProvinces}
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
                onScrollEndReached={fetchNextDistricts}
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
                rowTextForSelection={(selectedItem) => selectedItem.nameTH}
                buttonTextAfterSelection={(selectedItem) => selectedItem.nameTH}
                onSelect={(selectedItem) => onChange(selectedItem.id)}
                onScrollEndReached={fetchNextSubDistricts}
                disabled={!getValues('districtId')}
              />
            )}
          />
          {errors.subDistrictId && <Text red>{errors.subDistrictId.message}</Text>}
        </View>
        <View paddingV-5>
          <View paddingV-5>
            <Text bodyB>
              บ้านเลขที่ หมู่ ซอย ถนน <Text red>*</Text>
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
            name="priceRateImage"
            render={({ field: { onChange } }) => (
              <UploadFileButton
                onUpload={(file) => {
                  onChange(file)
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

const styles = StyleSheet.create({
  map: {
    marginVertical: 20,
    width: '100%',
    height: 150,
  },
  mapCard: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    backgroundColor: Colors.white,
    padding: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
  },
})

export default AddAddress
