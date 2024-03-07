import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Redirect, Slot, SplashScreen, router } from 'expo-router'
import { DesignSystem } from '../utils/design-system'
import { Auth0Provider, useAuth0 } from 'react-native-auth0'
import { LoaderScreen } from 'react-native-ui-lib'

import { QueryClientProvider } from '../providers/query-client'
import jobStore from '../stores/job'
import { socketManager } from '../libs/socket-client'

const driveRequestsSocket = socketManager.socket('/drive-requests')

DesignSystem.setup()
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const isConnected = jobStore.useTracked.isConnected()
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

  useEffect(() => {
    if (isConnected) {
      driveRequestsSocket.connect()
      console.log('Connected')
    } else {
      driveRequestsSocket.disconnect()
      console.log('Disconnected')
    }

    return () => {
      if (!driveRequestsSocket.connected) return
      driveRequestsSocket.disconnect()
    }
  }, [isConnected])

  useEffect(() => {
    const onDriveRequest = () => {
      router.push('/(protected)/incoming-drive-request')
    }

    driveRequestsSocket.on('requested', onDriveRequest)

    return () => {
      driveRequestsSocket.off('requested', onDriveRequest)
    }
  }, [])

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
