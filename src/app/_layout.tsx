import React, { useCallback, useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen, useNavigationContainerRef } from 'expo-router'
import { DesignSystem } from '@/utils/design-system'
import JobContextProvider from '@/contexts/JobContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppProviders from '@/providers'
import * as Sentry from '@sentry/react-native'
import Constants from 'expo-constants'

DesignSystem.setup()
SplashScreen.preventAutoHideAsync()

const IS_NATIVE_BUILD = Constants.appOwnership !== 'expo'

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: 'https://8b04138a8dbc17addc422ed9f7501170@o4507040207994880.ingest.us.sentry.io/4507051657003008',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.7 : 1.0,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking: IS_NATIVE_BUILD,
    }),
  ],
})

function RootLayout() {
  const ref = useNavigationContainerRef()
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
      throw error
    }
  }, [error])

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref)
    }
  }, [ref])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppProviders>
        <JobContextProvider>
          <Slot />
        </JobContextProvider>
      </AppProviders>
    </GestureHandlerRootView>
  )
}

export default Sentry.wrap(RootLayout)
