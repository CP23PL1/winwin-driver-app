import { AddressInfo } from '../addresses/type'
import { Driver } from '../drivers/type'

export type Coordinate = {
  lat: number
  lng: number
}

export type ServiceSpot = {
  id: number
  name: string
  addressLine1: string
  addressLine2?: string
  subDistrictId: number
  coords: Coordinate
  serviceSpotOwnerId: number
  priceRateImage: string
  serviceSpotImage: string
  createdAt: string
  updatedAt: string
}

export type ServiceSpotDetail = {
  id: number
  name: string
  coords: Coordinate
  addressLine1: string
  addressLine2?: string | null
  address: any // TODO
  serviceSpotOwner: Driver
  approved: boolean
  priceRateImageUrl: string
}

export type CreateServiceSpot = {
  name: string
  addressLine1: string
  addressLine2?: string
  subDistrictId: number
  coords: Coordinate
  serviceSpotOwnerId: string
  priceRateImage: {
    uri: string
    type: string
    name: string
  }
}
