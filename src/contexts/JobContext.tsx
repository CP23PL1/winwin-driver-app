import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import JobOfferModal from '@/components/JobOfferModal'
import { ReverseGeocodeResult } from '@/apis/google/type'
import { googleApi } from '@/apis/google'
import { router } from 'expo-router'
import { driveRequestSocket } from '@/sockets/drive-request'

enum DriveRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PICKED_UP = 'picked_up',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

type JobContextType = {
  isOnline: boolean
  setIsOnline: (isOnline: boolean) => void
  driveRequest: DriveRequest | null
  origin: ReverseGeocodeResult | null
  destination: ReverseGeocodeResult | null
  updateDriveRequestStatus: (status: DriveRequestStatus) => void
}

const JobContext = createContext<JobContextType>({} as JobContextType)

export default function JobContextProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(driveRequestSocket.connected)
  const [driveRequest, setDriveRequest] = useState<DriveRequest | null>(null)

  const [origin, setOrigin] = useState<ReverseGeocodeResult | null>(null)
  const [destination, setDestination] = useState<ReverseGeocodeResult | null>(null)

  const handleJobOffer = useCallback((data: DriveRequest) => {
    console.log('New Job Offered', data)
    setDriveRequest(data)
  }, [])

  const acceptDriveRequest = useCallback(() => {
    if (!driveRequest) return
    driveRequestSocket.emit('accept-drive-request', driveRequest)
  }, [driveRequest])

  const rejectDriveRequest = useCallback(() => {
    if (!driveRequest) return
    driveRequestSocket.emit('reject-drive-request', driveRequest)
    setDriveRequest(null)
  }, [driveRequest])

  const updateDriveRequestStatus = useCallback(
    (status: DriveRequestStatus) => {
      if (!driveRequest) return
      driveRequestSocket.emit('update-drive-request-status', {
        driveRequestId: driveRequest.id,
        status,
      })
    },
    [driveRequest],
  )

  const handleDriveRequestCreated = useCallback((data: DriveRequest) => {
    router.push(`/drive-request`)
    setDriveRequest(data)
  }, [])

  const handleDriveRequestUpdated = useCallback(
    (data: Partial<DriveRequest>) => {
      if (!driveRequest) return
      setDriveRequest({
        ...driveRequest,
        ...data,
      })
    },
    [driveRequest],
  )

  const handleException = useCallback((error: any) => {
    console.error('Error', error)
  }, [])

  const fetchReverseGeocode = useCallback(async () => {
    if (!driveRequest?.origin || !driveRequest?.destination) return
    try {
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
    } catch (error) {
      console.error('Failed to get reverse geocode', error)
    }
  }, [driveRequest?.origin, driveRequest?.destination])

  useEffect(() => {
    fetchReverseGeocode()
  }, [fetchReverseGeocode])

  useEffect(() => {
    driveRequestSocket.on('job-offer', handleJobOffer)
    driveRequestSocket.on('drive-request-created', handleDriveRequestCreated)
    driveRequestSocket.on('drive-request-updated', handleDriveRequestUpdated)
    driveRequestSocket.on('exception', handleException)

    return () => {
      driveRequestSocket.off('job-offer', handleJobOffer)
      driveRequestSocket.off('drive-request-created', handleDriveRequestCreated)
      driveRequestSocket.off('drive-request-updated', handleDriveRequestUpdated)
      driveRequestSocket.off('exception', handleException)
    }
  }, [handleDriveRequestCreated, handleDriveRequestUpdated, handleJobOffer, handleException])

  useEffect(() => {
    if (isOnline) {
      driveRequestSocket.connect()
    } else {
      driveRequestSocket.disconnect()
    }

    return () => {
      driveRequestSocket.disconnect()
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
        updateDriveRequestStatus,
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

export const useJob = () => {
  return useContext(JobContext)
}
