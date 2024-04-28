import { serviceSpotsApi } from '@/apis/service-spots'
import UploadFileButton from '@/components/UploadFileButton'
import { useDriverInfo } from '@/hooks/useDriverInfo'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ImagePickerAsset } from 'expo-image-picker'
import { Redirect, Stack, router } from 'expo-router'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View, Button } from 'react-native-ui-lib'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  priceRateImage: yup.mixed<ImagePickerAsset>().required('กรุณาอัปโหลดภาพถ่ายป้ายอัตราค่าโดยสาร'),
})

export default function EditServiceSpot() {
  const queryClient = useQueryClient()
  const { data: driverInfo } = useDriverInfo()

  const { data: serviceSpot } = useQuery({
    queryKey: ['service-spot', driverInfo?.serviceSpot.id],
    queryFn: () => serviceSpotsApi.getServiceSpotById(driverInfo!.serviceSpot.id),
    enabled: !!driverInfo?.serviceSpot.id,
  })

  const { mutate: updatePriceRateImage, isPending } = useMutation({
    mutationFn: serviceSpotsApi.updatePriceRateImage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['service-spot', driverInfo?.serviceSpot.id],
        type: 'all',
      })
      router.navigate('/service-spot')
    },
  })

  const {
    formState: { isDirty },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    values: {
      priceRateImage: {
        uri: serviceSpot!.priceRateImageUrl,
        width: 300,
        height: 400,
      },
    },
  })

  const onSubmit = useCallback(
    handleSubmit((data) => {
      updatePriceRateImage({
        serviceSpotId: serviceSpot!.id,
        priceRateImage: {
          uri: data.priceRateImage.uri,
          type: 'image/jpeg',
          name: 'priceRateImage.jpg',
        },
      })
    }),
    [serviceSpot, updatePriceRateImage],
  )

  if (!serviceSpot) {
    return <Redirect href="/" />
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'NotoSansThai',
          },
          title: 'แก้ไขซุ้มวินมอเตอร์ไซค์',
        }}
      />
      <View flex padding-20>
        <View flexG gap-15>
          <View>
            <Text caption>ชื่อซุ้มวินมอเตอร์ไซค์</Text>
            <Text bodyB>{serviceSpot.name}</Text>
          </View>
          <View>
            <Text caption>ที่อยู่</Text>
            <Text bodyB>{serviceSpot.formattedAddress}</Text>
          </View>
          <View gap-10>
            <View>
              <View row>
                <Text caption>ภาพถ่ายป้ายอัตราค่าโดยสาร</Text>
                <Text caption red>
                  *
                </Text>
              </View>
              <Text color="gray" caption>
                ราคาที่เรียกเก็บจากผู้ใช้บริการ และราคาที่แสดงในแอพพลิเคชั่น
              </Text>
            </View>

            <Controller
              control={control}
              name="priceRateImage"
              disabled={isPending}
              render={({ field: { onChange, disabled } }) => (
                <UploadFileButton
                  defaultImage={serviceSpot.priceRateImageUrl}
                  disabled={disabled}
                  onUpload={(file) => {
                    onChange(file)
                  }}
                />
              )}
            />
          </View>
        </View>
        <Button disabled={isPending || !isDirty} label="บันทึก" onPress={onSubmit} />
      </View>
    </>
  )
}
