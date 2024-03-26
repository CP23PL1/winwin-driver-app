declare type DriveRequest = {
  sid?: string
  user: User
  driver: Driver
  origin?: Coordinate
  destination?: Coordinate
  route?: {
    duration: string
    distanceMeters: number
    polyline: {
      encodedPolyline: string
    }
  }
  status?: DriveRequestStatus
  refCode?: string
  createdAt?: string
}
