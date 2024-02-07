import { useRouter } from 'expo-router'
import React from 'react'
import { Button, View, Text, Image } from 'react-native-ui-lib'

function Landing() {
  const router = useRouter()

  return (
    <View centerV height="100%" padding-25>
      <View center paddingT-100>
        <Image source={require('../assets/logo/logo.png')} height={200} width={200} />
      </View>
      <View centerV padding-25 paddingT-75>
        <Button label="เข้าสู่ระบบ" onPress={() => router.push('/login')} />
        <View paddingT-10>
          <Text bodyB center color="orange" underline onPress={() => router.push('/register')}>
            ลงทะเบียนใหม่
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Landing
