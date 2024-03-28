import { Driver } from '@/apis/drivers/type'
import { Coordinate } from '@/apis/service-spots/type'

export enum DriveRequestSessionStatus {
  PENDING = 'pending',
  ON_GOING = 'on_going',
  ARRIVED = 'arrived',
  PICKED_UP = 'picked_up',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum DriveRequestStatus {
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export type RequestDrive = {
  origin: MaskedPlaceDetail
  destination: MaskedPlaceDetail
  route: Route
}

export type DriveRequestSession = {
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

export type Waypoint = {
  name: string
  location: Coordinate
}

export type DriveRequest = {
  id: number
  user: User
  driver: Driver
  origin: Waypoint
  destination: Waypoint
  status: DriveRequestStatus
  createdAt: Date
  updatedAt: Date
  paidAmount: number
}
