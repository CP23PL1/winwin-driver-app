import { ServiceSpot } from '../service-spots/type'

export type Driver = {
  id: number
  firstName: string
  lastName: string
  approved: boolean
  createdAt: string
  updatedAt: string
  phoneNumber: string
  dateOfBirth: string
  nationalId: string
  no: number
  vehicle: Vehicle
  profileImage: string
  serviceSpot: Pick<ServiceSpot, 'id' | 'name'>
}

export type Vehicle = {
  id: number
  plate: string
  province: string
  model: string
  manufactor: string
}
