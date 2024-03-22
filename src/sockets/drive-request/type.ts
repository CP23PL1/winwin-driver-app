import { MaskedPlaceDetail } from '@/apis/google/type'
import { Coordinate } from '@/apis/service-spots/type'

export type CreateDriveRequest = {
  origin: Coordinate
  destination: Coordinate
}

export enum DriveRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PICKED_UP = 'picked_up',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export type RequestDrive = {
  origin: MaskedPlaceDetail
  destination: MaskedPlaceDetail
  route: Route
}
