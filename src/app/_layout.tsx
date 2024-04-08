import React, { useCallback, useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { DesignSystem } from '@/utils/design-system'
import { Auth0Provider } from 'react-native-auth0'
import { QueryClientProvider } from '@/providers/query-client'

import 'moment/src/locale/th'
import JobContextProvider from '@/contexts/JobContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

DesignSystem.setup()
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    NotoSansThai: require('../../assets/fonts/NotoSansThai-Regular.ttf'),
    NotoSansThaiBold: require('../../assets/fonts/NotoSansThai-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider>
      <Auth0Provider
        domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!}
      >
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <JobContextProvider>
            <Slot />
          </JobContextProvider>
        </GestureHandlerRootView>
      </Auth0Provider>
    </QueryClientProvider>
  )
}
