import { ServiceSpot } from '../service-spots/type'

export type DriverInfo = {
  id: number
  nationalId: string
  firstName: string
  lastName: string
  phoneNumber: string
  dateOfBirth: string
  createdAt: string
  updatedAt: string
  profileImage: string
  no: string
  vehicle: Vehicle
}

export type Driver = {
  id: string
  phoneNumber: string
  serviceSpot: ServiceSpot
  createdAt: Date
  updatedAt: Date
  info: DriverInfo
}

export type Vehicle = {
  id: number
  plate: string
  province: string
  model: string
  manufactor: string
}
