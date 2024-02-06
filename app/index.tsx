import { useRouter } from 'expo-router'
import React from 'react'
import { Button, View, Text  } from 'react-native-ui-lib'

function Landing() {
  const router = useRouter()
  
  return (
    <View flex centerV padding-25>
      <Button label='เข้าสู่ระบบ' onPress={() => router.push('/login')}/>
      <Text>ลงทะเบียน</Text>
    </View>
  )
}

export default Landing