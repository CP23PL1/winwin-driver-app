import { MaskedPlaceDetail } from '@/apis/google/type'
import { Coordinate } from '@/apis/service-spots/type'

export type CreateDriveRequest = {
  origin: Coordinate
  destination: Coordinate
}

export enum DriveRequestStatus {
  PENDING = 'pending',
  ON_GOING = 'on_going',
  ARRIVED = 'arrived',
  PICKED_UP = 'picked_up',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export type RequestDrive = {
  origin: MaskedPlaceDetail
  destination: MaskedPlaceDetail
  route: Route
}
