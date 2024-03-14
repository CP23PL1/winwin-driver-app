import { Manager } from 'socket.io-client'
import auth0 from './auth0'

export const authCallback = async (cb: (data: object) => void) => {
  const credentials = await auth0.credentialsManager.getCredentials()
  if (!credentials.accessToken) {
    throw new Error('No access token found')
  }
  cb({ accessToken: credentials.accessToken })
}

export const socketManager = new Manager(process.env.EXPO_PUBLIC_SOCKET_URL, {
  autoConnect: false,
})
