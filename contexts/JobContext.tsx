import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authCallback, socketManager } from '../libs/socket-client'
import JobOfferModal from '../components/JobOfferModal'
import { Coordinate, Route, User } from '../apis/shared/type'
import { Driver } from '../apis/drivers/type'
import { ReverseGeocodeResult } from '../apis/google/type'
import { googleApi } from '../apis/google'

export enum DriveRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PICKED_UP = 'picked_up',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export type DriveRequest = {
  id?: number
  user: User
  driver?: Driver
  origin: Coordinate
  destination: Coordinate
  status?: DriveRequestStatus
  refCode?: string
  createdAt?: string
  updatedAt?: string
  route: Route
}

type JobContextType = {
  isOnline: boolean
  setIsOnline: (isOnline: boolean) => void
  driveRequest: DriveRequest | null
  origin: ReverseGeocodeResult | null
  destination: ReverseGeocodeResult | null
}

const JobContext = createContext<JobContextType>({} as JobContextType)

export const useJob = () => {
  return useContext(JobContext)
}

const driveRequestsSocket = socketManager.socket('/drive-requests', {
  auth: authCallback,
})

export default function JobContextProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(driveRequestsSocket.connected)
  const [driveRequest, setDriveRequest] = useState<DriveRequest | null>(null)

  const [origin, setOrigin] = useState<ReverseGeocodeResult | null>(null)
  const [destination, setDestination] = useState<ReverseGeocodeResult | null>(null)

  const handleJobOffer = useCallback((data: DriveRequest) => {
    console.log('New Job Offered', data)
    setDriveRequest(data)
  }, [])

  const acceptDriveRequest = useCallback(() => {
    if (!driveRequest) return
    driveRequestsSocket.emit('accept-drive-request', driveRequest)
  }, [driveRequest])

  const rejectDriveRequest = useCallback(() => {
    if (!driveRequest) return
    driveRequestsSocket.emit('reject-drive-request', driveRequest)
    setDriveRequest(null)
  }, [driveRequest])

  const handleDriveRequestCreated = useCallback((data: DriveRequest) => {
    console.log('New Drive Request Created', data)
    setDriveRequest(data)
  }, [])

  const handleException = useCallback((error: any) => {
    console.error('Error', error)
  }, [])

  const fetchReverseGeocode = useCallback(async () => {
    if (!driveRequest?.origin || !driveRequest?.destination) return
    const [reverseOrgin, reverseDestination] = await Promise.all([
      googleApi.reverseGeocode({
        latitude: driveRequest.origin.lat,
        longitude: driveRequest.origin.lng,
      }),
      googleApi.reverseGeocode({
        latitude: driveRequest.destination.lat,
        longitude: driveRequest.destination.lng,
      }),
    ])
    setOrigin(reverseOrgin)
    setDestination(reverseDestination)
  }, [driveRequest?.origin, driveRequest?.destination])

  useEffect(() => {
    fetchReverseGeocode()
  }, [fetchReverseGeocode])

  useEffect(() => {
    driveRequestsSocket.on('job-offer', handleJobOffer)
    driveRequestsSocket.on('drive-request-created', handleDriveRequestCreated)
    driveRequestsSocket.on('exception', handleException)

    return () => {
      driveRequestsSocket.off('job-offer', handleJobOffer)
      driveRequestsSocket.off('drive-request-created', handleDriveRequestCreated)
      driveRequestsSocket.off('exception', handleException)
      driveRequestsSocket.disconnect()
    }
  }, [handleDriveRequestCreated, handleJobOffer, handleException])

  useEffect(() => {
    if (isOnline) {
      driveRequestsSocket.connect()
    } else {
      driveRequestsSocket.disconnect()
    }
  }, [isOnline])

  return (
    <JobContext.Provider
      value={{
        driveRequest,
        isOnline,
        setIsOnline,
        origin,
        destination,
      }}
    >
      {children}
      <JobOfferModal
        driveRequest={driveRequest}
        origin={origin}
        destination={destination}
        onAccepted={acceptDriveRequest}
        onRejected={rejectDriveRequest}
      />
    </JobContext.Provider>
  )
}
