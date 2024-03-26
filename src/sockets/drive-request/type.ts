import { MaskedPlaceDetail } from '@/apis/google/type'
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

export type CreateDriveRequest = {
  origin: Coordinate
  destination: Coordinate
}

export type RequestDrive = {
  origin: MaskedPlaceDetail
  destination: MaskedPlaceDetail
  route: Route
}
