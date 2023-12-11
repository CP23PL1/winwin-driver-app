import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { DesignSystem } from '../utils/design-system'
import { Auth0Provider } from 'react-native-auth0'
import { LoaderScreen } from 'react-native-ui-lib'

import { QueryClientProvider } from '../providers/query-client'

DesignSystem.setup()
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    NotoSansThai: require('../assets/fonts/NotoSansThai-Regular.ttf'),
    NotoSansThaiBold: require('../assets/fonts/NotoSansThai-Bold.ttf'),
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
    <QueryClientProvider>
      <Auth0Provider
        domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!}
      >
        <Slot />
      </Auth0Provider>
    </QueryClientProvider>
  )
}
