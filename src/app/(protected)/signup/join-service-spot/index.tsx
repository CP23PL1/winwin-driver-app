import { Stack, router } from 'expo-router'
import { View, Text, Image, Button, KeyboardAwareScrollView } from 'react-native-ui-lib'
import OTPTextInput from 'react-native-otp-textinput'
import { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { driversApi } from '@/apis/drivers'
import { DRIVER_INFO_QUERY_KEY } from '@/hooks/useDriverInfo'

export default function JoinServiceSpotScreen() {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const { mutate: joinServicespot, isPending } = useMutation({
    mutationFn: driversApi.joinServiceSpot,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DRIVER_INFO_QUERY_KEY,
        type: 'all',
      })
      router.replace('/')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      } else {
        setError('เกิดข้อผิดพลาดในการเข้าร่วมซุ้มวิน')
      }
    },
  })

  const [code, setCode] = useState<string>('')

  const handleCodeChange = useCallback(
    (code: string) => {
      setCode(code)
      if (error) setError(null)
    },
    [code, error],
  )

  const submit = useCallback(async () => {
    joinServicespot(code)
  }, [code])

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackground: () => <View flex backgroundColor="transparent" />,
          contentStyle: { backgroundColor: 'transparent' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'NotoSansThaiBold' },
          headerTitle: 'เข้าร่วมซุ้มวินที่มีอยู่',
        }}
      />
      <KeyboardAwareScrollView>
        <View flex padding-30>
          <View flexG centerH gap-20>
            <Image
              width={250}
              height={250}
              resizeMode="contain"
              source={require('../../../../../assets/coach_man_yellow.png')}
            />
            <View center gap-8>
              <Text h5B>กรุณากรอกรหัสเชิญชวน</Text>
              <Text caption>กรอกรหัสเชิญชวนของซุ้มวินที่คุณต้องการจะเข้าร่วม</Text>
            </View>
            <View center gap-10>
              <OTPTextInput
                keyboardType="default"
                textInputStyle={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderBottomWidth: 1,
                }}
                handleTextChange={handleCodeChange}
                inputCount={5}
                tintColor={'#FBDAAB'}
                offTintColor={'#FBDAAB'}
              />
              <Text caption red center aria-hidden={!!error}>
                {error}
              </Text>
            </View>
          </View>

          <Button label="ยืนยัน" onPress={submit} disabled={isPending} />
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}
