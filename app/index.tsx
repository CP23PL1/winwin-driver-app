import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/login/phoneNumber';
import OTP from './screens/login/otp';
import RegisterForm from './screens/registerForm';
import { DesignSystem } from '../utils/design-system'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LoaderScreen } from 'react-native-ui-lib'

DesignSystem.setup()

const Stack = createNativeStackNavigator();

function MyStack() {
  const [fontsLoaded, error] = useFonts({
    NotoSansThai: require('../assets/fonts/NotoSansThai-Regular.ttf'),
    NotoSansThaiBold: require('../assets/fonts/NotoSansThai-Bold.ttf')
  })

  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <LoaderScreen />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
    </Stack.Navigator>
  );
}

export default MyStack