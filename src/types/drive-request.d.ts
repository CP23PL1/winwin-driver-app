declare type DriveRequest = {
  id?: number
  user: User
  driver: Driver
  origin: Coordinate
  destination: Coordinate
  status?: DriveRequestStatus
  refCode?: string
  createdAt?: string
  updatedAt?: string
  route: Route
}
