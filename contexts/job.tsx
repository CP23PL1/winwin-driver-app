import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authCallback, socketManager } from '../libs/socket-client'
import { Modal, Text, View } from 'react-native-ui-lib'
import JobOfferModal from '../components/JobOfferModal'
import { Coordinate, Route, User } from '../apis/shared/type'

export enum DriveRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PICKED_UP = 'picked_up',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export type DriveRequest = {
  id: number
  user: User
  driver: any
  origin: Coordinate
  destination: Coordinate
  status: DriveRequestStatus
  refCode: string
  createdAt: string
  updatedAt: string
  route?: Route
}

type JobContextType = {
  isOnline: boolean
  setIsOnline: (isOnline: boolean) => void
  driveRequest: DriveRequest | null
}

const JobContext = createContext<JobContextType>({} as JobContextType)

export const useJob = () => {
  return useContext(JobContext)
}

const driveRequestsSocket = socketManager.socket('/drive-requests', {
  auth: authCallback,
})

export default function JobContextProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(false)
  const [driveRequest, setDriveRequest] = useState<DriveRequest | null>(null)

  const onDriveRequestRequested = (newDriveRequest: DriveRequest) => {
    setDriveRequest(newDriveRequest)
  }

  const responseJobOffer = useCallback(
    (response: 'accepted' | 'rejected') => {
      if (!driveRequest) return
      driveRequestsSocket.emit('drive-requests:update', {
        id: driveRequest.id,
        status: response,
      })
    },
    [driveRequest],
  )

  useEffect(() => {
    driveRequestsSocket.on('drive-requests:requested', onDriveRequestRequested)

    return () => {
      driveRequestsSocket.off('drive-requests:requested', onDriveRequestRequested)
    }
  }, [])

  useEffect(() => {
    if (isOnline && !driveRequestsSocket.connected) {
      driveRequestsSocket.connect()
    }

    return () => {
      if (driveRequestsSocket.connected) driveRequestsSocket.disconnect()
    }
  }, [isOnline])

  return (
    <JobContext.Provider value={{ driveRequest, isOnline, setIsOnline }}>
      {children}
      <JobOfferModal
        driveRequest={driveRequest}
        onAccepted={() => responseJobOffer('accepted')}
        onRejected={() => responseJobOffer('rejected')}
      />
    </JobContext.Provider>
  )
}
