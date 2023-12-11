import 'react-native-url-polyfill/auto'
import { DriversApi } from '@cp23pl1/winwin-client-sdk'
import axiosInstance from '../libs/axios'

const drivers = new DriversApi(undefined, undefined, axiosInstance)

export default { drivers }
