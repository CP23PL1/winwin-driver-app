declare type DriveRequestSession = {
  sid?: string
  user: User
  driver: Driver
  origin?: Waypoint
  destination?: Waypoint
  duration: string
  distanceMeters: number
  polyline: {
    encodedPolyline: string
  }
  priceByDistance: number
  serviceCharge: number
  total: number
  status?: DriveRequestSessionStatus
  refCode?: string
  createdAt?: string
}

declare type Waypoint = {
  name: string
  location: Coordinate
}

declare type DriveRequest = {
  id: number
  user: User
  driver: Driver
  origin: Coordinate
  destination: Coordinate
  status: DriveRequestStatus
  refCode: string
  createdAt: Date
  updatedAt: Date
}
