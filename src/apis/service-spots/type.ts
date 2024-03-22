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
