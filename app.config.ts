import { ExpoConfig } from 'expo/config'
import { withSentry } from '@sentry/react-native/expo'

const config: ExpoConfig = {
  name: process.env.APP_NAME || 'WinWin Driver',
  slug: 'winwin-driver',
  scheme: 'winwin-driver',
  version: process.env.APP_VERSION || '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.cp23pl1.winwin.driver',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FDA84B',
    },
    permissions: [
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.RECORD_AUDIO',
    ],
    package: 'com.cp23pl1.winwin.driver',
    config: {
      googleMaps: {
        apiKey: 'AIzaSyCg98R2mDzaRdIeb9Cnt4o9y-cyrr5p04g',
      },
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'react-native-auth0',
      {
        domain: 'cp23pl1-kmutt.jp.auth0.com',
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
      },
    ],
    'expo-image-picker',
    [
      '@sentry/react-native/expo',
      {
        organization: 'cp23pl1',
        project: 'winwin-driver-app',
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'af529677-24bf-4a9d-931b-51e1b1f3f60e',
    },
  },
  sdkVersion: '50.0.0',
  owner: 'cp23pl1',
}

export default withSentry(config, {
  url: 'https://sentry.io/',
  project: 'winwin-driver-app',
  organization: 'cp23pl1',
})
