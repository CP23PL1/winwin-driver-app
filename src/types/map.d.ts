declare type Route = {
  duration: string
  distanceMeters: number
  polyline: {
    encodedPolyline: string
  }
}

declare type PlusCode = {
  compound_code: string
  global_code: string
}

declare type PlaceType = {
  type: string
}

declare type Point = {
  lat: number
  lng: number
}

declare type Geometry = {
  location: Point
  viewport: {
    northeast: Point
    southwest: Point
  }
}

declare type AddressComponent = {
  long_name: string
  short_name: string
  types: PlaceType[]
}

declare type GooglePlaceDetail = {
  address_components: AddressComponent[]
  adr_address: string
  formatted_address: string
  geometry: Geometry
  icon: string
  id: string
  name: string
  place_id: string
  plus_code: PlusCode
  reference: string
  scope: 'GOOGLE'
  types: PlaceType[]
  url: string
  utc_offset: number
  vicinity: string
}
