import { Coordinate } from '../shared/type'

export type ServiceSpot = {
  id: number
  name: string
  placeId: string
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
