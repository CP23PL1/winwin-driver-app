import React from 'react'
import { View, Button, Colors, Text } from 'react-native-ui-lib'
import { Redirect, useRouter } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'

type Props = {
  status: string
}

function SuccessOrFail({ status }: Props) {
    const router = useRouter()
    const prevStep = () => {
      router.push('/(protected)/')
    }
    if(status == 'true') {
      return (
        <View paddingH-30 paddingT-30>
          <Text center h1B>
            เพิ่มซุ้มสำเร็จ
          </Text>
          <View center paddingV-45>
            <View
              style={{
                borderRadius: 90,
                borderColor: '#6AA960',
                borderWidth: 1,
              }}
              backgroundColor="#6AA960"
              width={170}
              height={170}
              center
            >
              <View center>
                <FontAwesome5 name="check" size={80} color="white" />
              </View>
            </View>
          </View>
          <View paddingH-50>
            <Button secondary paddingV-15 label={'ต่อไป'} onPress={prevStep} />
          </View>
        </View>
          )
    } 

}

export default SuccessOrFail
