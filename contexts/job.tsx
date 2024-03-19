import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authCallback, socketManager } from '../libs/socket-client'
import { Modal, Text, View } from 'react-native-ui-lib'
import JobOfferModal from '../components/JobOfferModal'
import { Coordinate, Route, User } from '../apis/shared/type'
import { router } from 'expo-router'
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

  const onDriveRequested = (data: DriveRequest) => {
    console.log('Drive requested', data)
    setDriveRequest(data)
    if (data.status === DriveRequestStatus.ACCEPTED) {
      router.push(`/drive-requests/${data.id}`)
    }
  }

  const acceptDriveRequest = () => {
    if (!driveRequest) return
    driveRequestsSocket.emit('accept-drive-request', driveRequest)
  }

  const rejectDriveRequest = () => {
    driveRequestsSocket.emit('reject-drive-request', driveRequest)
    setDriveRequest(null)
  }

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
    driveRequestsSocket.on('drive-requested', onDriveRequested)

    return () => {
      driveRequestsSocket.off('drive-requested', onDriveRequested)
      driveRequestsSocket.disconnect()
    }
  }, [])

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
